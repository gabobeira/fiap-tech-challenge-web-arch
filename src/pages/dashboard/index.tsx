"use client";
import { FCard, FHeader, FMenuDropdown, FMenuList } from "@/components";
import { DashboardView, MENU_ITEMS_DASHBOARD } from "@/constants/menuItems";
import { AccountData } from "@/domain/types/AccountTypes";
import {
  TransactionData,
  TransactionForm,
} from "@/domain/types/TransactionTypes";
import { AccountController } from "@/presentation/controllers/AccountController";
import { TransactionController } from "@/presentation/controllers/TransactionController";
import { useBalanceStore } from "@/stores/useBalanceStore";
import ThemeProviderWrapper from "@/theme/ThemeProviderWrapper";
import { AccountCircle } from "@mui/icons-material";
import { Box, Container, Grid, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AccountSummaryContainer from "./containers/AccountSummaryContainer/AccountSummaryContainer";
import InvestmentsContainer from "./containers/InvestmentsContainer/InvestmentsContainer";
import TransactionsContainer from "./containers/TransactionsContainer/TransactionsContainer";

export default function Dashboard() {
  const setBalance = useBalanceStore((state) => state.setBalance);
  const balance = useBalanceStore((state) => state.balance);

  const [localAccount, setLocalAccount] = useState<AccountData>({
    fullName: "",
    firstName: "",
    balance: 0,
    currency: "",
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

  const pathname = usePathname();
  const currentMenuItems = MENU_ITEMS_DASHBOARD.map((item) => ({
    ...item,
    current: item.path === pathname,
  }));

  const accountController = new AccountController();
  const transactionController = new TransactionController();

  async function fetchAccount() {
    const updatedAccount = await accountController.getAccountInfo();
    setLocalAccount(updatedAccount);
    setBalance(updatedAccount.balance);
  }

  async function fetchTransactions() {
    const updatedTransactions = await transactionController.getTransactions();
    setLocalTransactions(updatedTransactions);
  }

  async function updateAll() {
    await fetchTransactions();
    await fetchAccount();
  }

  async function submitAddTransaction(transactionForm: TransactionForm) {
    const transaction =
      await transactionController.addTransaction(transactionForm);

    const updatedTransactions = [...localTransactions, transaction];
    setLocalTransactions(updatedTransactions);

    setLocalAccount((prev) => {
      const newBalance = prev.balance + transaction.value;
      setBalance(newBalance);
      return { ...prev, balance: newBalance };
    });

    await fetchTransactions();
  }

  async function submitEditTransaction(transactionData: TransactionData) {
    const editedTransaction =
      await transactionController.editTransaction(transactionData);
    setLocalTransactions(
      localTransactions.map((transaction) =>
        transaction.id === transaction.id ? editedTransaction : transaction
      )
    );
  }

  async function submitDeleteTransaction(transactionId: string) {
    await transactionController.removeTransaction(transactionId);
    setLocalTransactions(
      localTransactions.filter(
        (transaction) => transaction.id !== transactionId
      )
    );
    await updateAll();
  }

  useEffect(() => {
    fetchAccount();
    fetchTransactions();
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
              <Link href={"/"} style={{ display: "flex" }}>
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
                accountBalance={balance}
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
