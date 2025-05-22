"use client";
import { FHeader, FMenuDropdown } from "@/components";
import { getAccountInfo } from "@/services/Account/Account.controller";
import { Account } from "@/services/Account/Account.model";
import { AuthService } from "@/services/AuthService";
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
import { useRouter } from "next/router";
import { useState } from "react";
import AccountDashboard from "./components/AccountDashboard/AccountDashboard";

export default function DashboardView() {
  const accountDefault: Account = {
    fullName: "",
    firstName: "",
    balance: 0,
    currency: "",
    id: 0,
    idUser: 0,
  };

  const transactions: Transaction[] = [];

  const [localAccount, setLocalAccount] = useState(accountDefault);
  const [localTransactions, setLocalTransactions] = useState(transactions);

  const authService = new AuthService();
  const router = useRouter();
  const token = authService.getToken();

  async function getInitialData() {
    if (token) {
      const account = await fetchAccount();
      await fetchTransactions(account.id);
      authService.refreshTokenExpiration();
    }
  }

  async function fetchAccount() {
    const updatedAccount = await getAccountInfo(token!.id);
    setLocalAccount(updatedAccount);
    return updatedAccount;
  }

  async function fetchTransactions(idAccount: number) {
    const updatedTransactions = await getTransactions(idAccount);
    setLocalTransactions(updatedTransactions);
    return updatedTransactions;
  }

  async function submitAddTransaction(transaction: TransactionInput) {
    await addTransaction(transaction);

    await getInitialData();
  }

  async function submitEditTransaction(transaction: TransactionData) {
    await editTransaction(transaction);
    await getInitialData();
  }

  async function submitDeleteTransaction(transactionId: string) {
    await deleteTransaction(transactionId);
    await getInitialData();
  }

  async function handleLogout() {
    authService.logout();
    router.push("/");
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
            <Link href={"/"} style={{ display: "flex" }} onClick={handleLogout}>
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
