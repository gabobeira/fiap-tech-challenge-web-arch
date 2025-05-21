"use client";
import { FHeader, FMenuDropdown } from "@/components";
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
import { Box, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import AccountDashboard from "./components/AccountDashboard/AccountDashboard";

export default function DashboardView() {
  const setBalance = useBalanceStore((state) => state.setBalance);
  const balance = useBalanceStore((state) => state.balance);

  const [localAccount, setLocalAccount] = useState<AccountData>({
    fullName: "",
    firstName: "",
    balance: 0,
    currency: "",
  });
  const [localTransactions, setLocalTransactions] = useState<TransactionData[]>(
    []
  );

  const accountController = new AccountController();
  const transactionController = new TransactionController();

  async function getInitialData() {
    await fetchAccount();
    await fetchTransactions();
  }

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

  return (
    <ThemeProviderWrapper>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="By FIAP Tech Challenge" />
      </Head>
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
      <AccountDashboard
        account={{ ...localAccount, balance }}
        getInitialData={getInitialData}
        transactionList={localTransactions}
        submitAddTransaction={submitAddTransaction}
        submitEditTransaction={submitEditTransaction}
        submitDeleteTransaction={submitDeleteTransaction}
      />
    </ThemeProviderWrapper>
  );
}
