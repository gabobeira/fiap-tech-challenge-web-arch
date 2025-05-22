"use client";
import {
  FAccountSummaryCard,
  FAlert,
  FCard,
  FInvestmentsCard,
  FMenuList,
  FModal,
  FTransactionForm,
  FTransactionFormCard,
  FTransactionFormItem,
  FTransactionFormItemInput,
  FTransactionListCard,
  TransactionItem,
} from "@/components";
import { DashboardView, MENU_ITEMS_DASHBOARD } from "@/constants/menuItems";
import { Account } from "@/services/Account/Account.model";
import { AuthService } from "@/services/AuthService";
import {
  Transaction,
  TransactionData,
  TransactionInput,
} from "@/services/Transaction/Transaction.model";
import {
  formatCurrency,
  formatDate,
  getFormattedDateNow,
} from "@/utils/formatters";
import { Container, Grid } from "@mui/material";
import Image from "next/image";
import { usePathname } from "next/navigation";
import router from "next/router";
import { useEffect, useState } from "react";
import { image } from "../../../../../public/assets/image";

interface AccountDashboardProps {
  account: Account;
  transactionList: Transaction[];
  getInitialData: () => void;
  submitAddTransaction?: (transaction: TransactionInput) => void;
  submitEditTransaction?: (transaction: TransactionData) => void;
  submitDeleteTransaction?: (transactionId: string) => void;
}

export default function AccountDashboard({
  account,
  transactionList,
  getInitialData,
  submitAddTransaction,
  submitEditTransaction,
  submitDeleteTransaction,
}: AccountDashboardProps) {
  const [view, setView] = useState<DashboardView>("summary");
  const loadData = async () => {
    getInitialData();
  };
  const [sessionExpired, setSessionExpired] = useState<boolean>(false);

  const authService = new AuthService();

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        !authService.isAuthenticated() ||
        authService.verifyExpirationToken()
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
    loadData();
  }, []);

  const formattedBalance = formatCurrency(account.balance, account.currency);
  const formattedDate = getFormattedDateNow();
  const pathname = usePathname();

  const currentMenuItems = MENU_ITEMS_DASHBOARD.map((item) => ({
    ...item,
    current: item.path === pathname,
  }));

  const formattedTransactions: TransactionItem[] = transactionList.map(
    (transaction) => ({
      id: transaction.id,
      type: transaction.type,
      formattedDate: formatDate(transaction.date),
      formattedValue: formatCurrency(transaction.value, transaction.currency),
    })
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentTransaction, setCurrentTransaction] = useState<Transaction>();

  const openEditModal = (transactionId: string) => {
    setCurrentTransaction(
      transactionList.find(({ id }) => id === transactionId)
    );

    setIsModalOpen(true);
  };

  const handleEditTransaction = (transaction: FTransactionFormItem) => {
    if (!submitEditTransaction) {
      return;
    }

    const editedTransaction: TransactionData = {
      ...transaction,
      currency: "R$",
      idAccount: account.id,
      date: new Date().toISOString(),
    };

    submitEditTransaction(editedTransaction);
  };

  const handleAddTransaction = (transaction: FTransactionFormItemInput) => {
    if (!submitAddTransaction) {
      return;
    }

    const newTransaction: TransactionInput = {
      ...transaction,
      currency: "R$",
      idAccount: account.id,

      date: new Date().toISOString(),
    };

    submitAddTransaction(newTransaction);
  };

  return (
    <main
      style={{
        minWidth: "100%",
        minHeight: "100%",
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
            <Grid
              size={{ xs: 12, lg: 10 }}
              display="flex"
              flexDirection="column"
              gap={3}
            >
              <FAccountSummaryCard
                firstName={account.firstName}
                currency={account.currency}
                balance={formattedBalance}
                date={formattedDate}
              >
                <Image src={`${image}/card-pixels-2.svg`} alt="" fill />
                <Image src={`${image}/card-pixels-1.svg`} alt="" fill />
                <Image src={`${image}/card-illustration-1.svg`} alt="" fill />
              </FAccountSummaryCard>
            </Grid>
          ) : null}

          {view === "investments" ? (
            <Grid
              size={{ xs: 12, lg: 10 }}
              display="flex"
              flexDirection="column"
              gap={3}
            >
              <FTransactionFormCard
                addTransaction={handleAddTransaction}
                accountBalance={account.balance}
                showAll={false}
                showInvestment={true}
              >
                <Image
                  src={`${image}/card-pixels-3.svg`}
                  alt=""
                  layout="fill"
                />
                <Image
                  src={`${image}/card-pixels-4.svg`}
                  alt=""
                  layout="fill"
                />
                <Image
                  src={`${image}/card-illustration-2.svg`}
                  alt=""
                  layout="fill"
                />
              </FTransactionFormCard>
              <FInvestmentsCard>
                <Image
                  src={`${image}/card-pixels-3.svg`}
                  alt=""
                  layout="fill"
                />
                <Image
                  src={`${image}/card-pixels-4.svg`}
                  alt=""
                  layout="fill"
                />
              </FInvestmentsCard>
            </Grid>
          ) : null}

          {view === "transactions" ? (
            <>
              <Grid
                size={{ xs: 12, lg: 6 }}
                display="flex"
                flexDirection="column"
                gap={3}
              >
                <FTransactionFormCard
                  addTransaction={handleAddTransaction}
                  accountBalance={account.balance}
                  showAll={false}
                  showInvestment={false}
                >
                  <Image
                    src={`${image}/card-pixels-3.svg`}
                    alt=""
                    layout="fill"
                  />
                  <Image
                    src={`${image}/card-pixels-4.svg`}
                    alt=""
                    layout="fill"
                  />
                  <Image
                    src={`${image}/card-illustration-2.svg`}
                    alt=""
                    layout="fill"
                  />
                </FTransactionFormCard>
              </Grid>
              <Grid size={{ xs: 12, lg: 4 }}>
                <FTransactionListCard
                  transactionItems={formattedTransactions}
                  editTransaction={openEditModal}
                  deleteTransaction={submitDeleteTransaction}
                />
              </Grid>
            </>
          ) : null}
        </Grid>
        <FModal
          title="Editar transação"
          isOpen={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
        >
          <FTransactionForm
            accountBalance={account.balance}
            currentTransaction={currentTransaction}
            editTransaction={handleEditTransaction}
            closeEditModal={() => setIsModalOpen(false)}
            buttonText="Concluir edição"
            showAll={true}
            showInvestment={false}
          />
        </FModal>
      </Container>
    </main>
  );
}
