"use client";
import { FAlert, FHeader, FMenuDropdown } from "@/components";

import { FCard, FMenuList } from "@/components";
import { DashboardView, MENU_ITEMS_DASHBOARD } from "@/constants/menuItems";
import { AccountData } from "@/domain/types/AccountTypes";
import {
  TransactionData,
  TransactionForm,
} from "@/domain/types/TransactionTypes";
import { AccountController } from "@/presentation/controllers/AccountController";
import { AuthController } from "@/presentation/controllers/AuthController";
import { TransactionController } from "@/presentation/controllers/TransactionController";
import ThemeProviderWrapper from "@/theme/ThemeProviderWrapper";
import { AccountCircle } from "@mui/icons-material";
import { Box, Container, Grid, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AccountSummaryContainer from "./containers/AccountSummaryContainer/AccountSummaryContainer";
import InvestmentsContainer from "./containers/InvestmentsContainer/InvestmentsContainer";
import TransactionsContainer from "./containers/TransactionsContainer/TransactionsContainer";

export default function Dashboard() {
  const [localAccount, setLocalAccount] = useState<AccountData>({
    fullName: "",
    firstName: "",
    balance: 0,
    currency: "",
    id: 0,
    idUser: 0,
    investments: {
      total: 0,
      fixed: 0,
      variable: 0,
    },
  });
  const [localTransactions, setLocalTransactions] = useState<TransactionData[]>(
    []
  );
  const [view, setView] = useState<DashboardView>("summary");

  const [sessionExpired, setSessionExpired] = useState<boolean>(false);

  const pathname = usePathname();
  const currentMenuItems = MENU_ITEMS_DASHBOARD.map((item) => ({
    ...item,
    current: item.path === pathname,
  }));

  const authController = new AuthController();
  const accountController = new AccountController();
  const transactionController = new TransactionController();

  const router = useRouter();
  const token = authController.getToken();

  async function getInitialData() {
    if (token) {
      const account = await fetchAccount();
      await fetchTransactions(account.id);
      authController.refreshTokenExpiration();
    }
  }

  async function fetchAccount() {
    const updatedAccount = await accountController.getAccountInfo(token!.id);
    setLocalAccount(updatedAccount);
    return updatedAccount;
  }

  async function fetchTransactions(idAccount: number) {
    const updatedTransactions =
      await transactionController.getTransactions(idAccount);
    setLocalTransactions(updatedTransactions);
    return updatedTransactions;
  }

  async function submitAddTransaction(transaction: TransactionForm) {
    await transactionController.addTransaction(
      transaction,
      localAccount.idUser
    );
    await getInitialData();
  }

  async function submitEditTransaction(transaction: TransactionData) {
    await transactionController.editTransaction(transaction);
    await getInitialData();
  }

  async function submitDeleteTransaction(transactionId: string) {
    await transactionController.removeTransaction(transactionId);
    await getInitialData();
  }

  async function handleLogout() {
    authController.logout();
    router.push("/");
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        !authController.isAuthenticated() ||
        authController.verifyExpirationToken()
      ) {
        setSessionExpired(true);
        const timeout = setTimeout(() => {
          router.push("/");
        }, 2000);

        return () => clearTimeout(timeout);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [router]);

  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <ThemeProviderWrapper>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="By FIAP Tech Challenge" />
      </Head>
      <main
        style={{
          minWidth: "100%",
          minHeight: "100vh",
          backgroundColor: "var(--mui-palette-tertiary-light)",
        }}
      >
        {sessionExpired && (
          <FAlert
            severity="warning"
            open={true}
            text="Sua sessão expirou, faça login novamente!"
            onClose={() => {}}
          />
        )}
        <FHeader
          leftContent={
            <Box>
              <FMenuDropdown
                options={{ sx: { display: { xs: "flex", lg: "none" } } }}
              >
                <Link href="" />
              </FMenuDropdown>
            </Box>
          }
          rightContent={
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="body1">{localAccount.fullName}</Typography>
              <Link
                href={"/"}
                style={{ display: "flex" }}
                onClick={handleLogout}
              >
                <AccountCircle color="secondary" sx={{ fontSize: 40 }} />
              </Link>
            </Box>
          }
        />
        <Container maxWidth="xl">
          <Grid container spacing={3} paddingTop={3} paddingBottom={3}>
            <Grid size={{ xs: 0, lg: 2 }}>
              <FCard
                options={{
                  sx: {
                    display: { xs: "none", lg: "block" },
                  },
                }}
              >
                <FMenuList<DashboardView>
                  menuItems={currentMenuItems}
                  itemClick={(path) => setView(path)}
                />
              </FCard>
            </Grid>
            {view === "summary" ? (
              <AccountSummaryContainer account={localAccount} />
            ) : null}

            {view === "investments" ? (
              <InvestmentsContainer account={localAccount} />
            ) : null}

            {view === "transactions" ? (
              <TransactionsContainer
                accountBalance={localAccount.balance}
                transactionList={localTransactions}
                submitAddTransaction={submitAddTransaction}
                submitEditTransaction={submitEditTransaction}
                submitDeleteTransaction={submitDeleteTransaction}
              />
            ) : null}
          </Grid>
        </Container>
      </main>
    </ThemeProviderWrapper>
  );
}
