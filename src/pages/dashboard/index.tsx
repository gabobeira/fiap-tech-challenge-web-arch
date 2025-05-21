"use client";
import { FHeader, FMenuDropdown } from "@/components";
import { getAccountInfo } from "@/services/Account/Account.controller";
import { Account } from "@/services/Account/Account.model";
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  getTransactions,
} from "@/services/Transaction/Transaction.controller";
import {
  Transaction,
  TransactionData,
  TransactionInput,
} from "@/services/Transaction/Transaction.model";
import ThemeProviderWrapper from "@/theme/ThemeProviderWrapper";
import { AccountCircle } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import AccountDashboard from "./components/AccountDashboard/AccountDashboard";

export default function DashboardView() {
  const account: Account = {
    fullName: "",
    firstName: "",
    balance: 0,
    currency: "",
  };

  const transactions: Transaction[] = [];

  const [localAccount, setLocalAccount] = useState(account);
  const [localTransactions, setLocalTransactions] = useState(transactions);

  function getInitialData() {
    fetchAccount();
    fetchTransactions();
  }

function fetchAccount() {
  const updatedAccount$ = getAccountInfo();
  
  updatedAccount$.subscribe((account) => {
      setLocalAccount(account);
    });
}

  function fetchTransactions() {
  const updatedTransactions$ = getTransactions();

  updatedTransactions$.subscribe((transactions) => {
    setLocalTransactions(transactions);
  });
}

function submitAddTransaction(transaction: TransactionInput) {
  addTransaction(transaction);

  const updatedTransactions$ = getTransactions();

  updatedTransactions$.subscribe((transactions) => {
    setLocalTransactions(transactions);
  });
}

  function submitEditTransaction(transaction: TransactionData) {
    editTransaction(transaction);
    setLocalTransactions(
      localTransactions.map((t) => (t.id === transaction.id ? transaction : t))
    );
  }

  function submitDeleteTransaction(transactionId: string) {
    deleteTransaction(transactionId);
    setLocalTransactions(
      localTransactions.filter((t) => t.id !== transactionId)
    );
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
        account={localAccount}
        getInitialData={getInitialData}
        transactionList={localTransactions}
        submitAddTransaction={submitAddTransaction}
        submitEditTransaction={submitEditTransaction}
        submitDeleteTransaction={submitDeleteTransaction}
      />
    </ThemeProviderWrapper>
  );
}
