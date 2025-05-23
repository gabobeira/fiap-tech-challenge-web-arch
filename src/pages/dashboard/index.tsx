"use client";
import { FAlert, FHeader, FMenuDropdown } from "@/components";

import { FCard, FMenuList } from "@/components";
import { MENU_ITEMS_DASHBOARD } from "@/constants/menuItems";
import {
  TransactionData,
  TransactionForm,
} from "@/domain/types/TransactionTypes";
import { AccountController } from "@/presentation/controllers/AccountController";
import { AuthController } from "@/presentation/controllers/AuthController";
import { TransactionController } from "@/presentation/controllers/TransactionController";
import { useAccountStore } from "@/stores/AccountStore";
import ThemeProviderWrapper from "@/theme/ThemeProviderWrapper";
import { AccountCircle } from "@mui/icons-material";
import { Box, Container, Grid, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AccountSummaryContainer from "./containers/AccountSummaryContainer/AccountSummaryContainer";
import InvestmentsContainer from "./containers/InvestmentsContainer/InvestmentsContainer";
import TransactionsContainer from "./containers/TransactionsContainer/TransactionsContainer";

export default function Dashboard() {
  const {
    account,
    dashboardView,
    sessionExpired,
    setAccount,
    setTransactions,
    setDashboardView,
    setSessionExpired,
  } = useAccountStore();

  const authController = new AuthController();
  const accountController = new AccountController();
  const transactionController = new TransactionController();

  const router = useRouter();
  const token = authController.getToken();

  async function getInitialData() {
    if (token) {
      const account = await accountController.getAccountInfo(token!.id);
      const transactions = await transactionController.getTransactions(
        account.id
      );

      setAccount(account);
      setTransactions(transactions);

      authController.refreshTokenExpiration();
    }
  }

  async function submitAddTransaction(transaction: TransactionForm) {
    await transactionController.addTransaction(transaction, account.idUser);
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

  function handleLogout() {
    authController.logout();
    router.push("/");
  }

  useEffect(() => {
    getInitialData();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                menuItems={MENU_ITEMS_DASHBOARD.map((item) => ({
                  ...item,
                  current: item.view === dashboardView,
                }))}
                itemClick={(view) => setDashboardView(view)}
              />
            </Box>
          }
          rightContent={
            <Box display="flex" alignItems="center" gap={2}>
              <Typography variant="body1">{account.fullName}</Typography>
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
                customPadding="12px"
              >
                <FMenuList
                  menuItems={MENU_ITEMS_DASHBOARD.map((item) => ({
                    ...item,
                    current: item.view === dashboardView,
                  }))}
                  itemClick={(view) => setDashboardView(view)}
                />
              </FCard>
            </Grid>
            {dashboardView === "summary" ? <AccountSummaryContainer /> : null}

            {dashboardView === "transactions" ? (
              <TransactionsContainer
                submitAddTransaction={submitAddTransaction}
                submitEditTransaction={submitEditTransaction}
                submitDeleteTransaction={submitDeleteTransaction}
              />
            ) : null}

            {dashboardView === "investments" ? <InvestmentsContainer /> : null}
          </Grid>
        </Container>
      </main>
    </ThemeProviderWrapper>
  );
}
