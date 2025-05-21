"use client";
import {
  FAccountSummaryCard,
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
                <Image
                  src={`${image}/card-pixels-2.svg`}
                  alt=""
                  fill
                  loading="lazy"
                />
                <Image
                  src={`${image}/card-pixels-1.svg`}
                  alt=""
                  fill
                  loading="lazy"
                />
                <Image
                  src={`${image}/card-illustration-1.svg`}
                  alt=""
                  fill
                  loading="lazy"
                />
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
              <FInvestmentsCard>
                <Image
                  src={`${image}/card-pixels-3.svg`}
                  alt=""
                  layout="fill"
                  loading="lazy"
                />
                <Image
                  src={`${image}/card-pixels-4.svg`}
                  alt=""
                  layout="fill"
                  loading="lazy"
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
                >
                  <Image
                    src={`${image}/card-pixels-3.svg`}
                    alt=""
                    layout="fill"
                    loading="lazy"
                  />
                  <Image
                    src={`${image}/card-pixels-4.svg`}
                    alt=""
                    layout="fill"
                    loading="lazy"
                  />
                  <Image
                    src={`${image}/card-illustration-2.svg`}
                    alt=""
                    layout="fill"
                    loading="lazy"
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
          />
        </FModal>
      </Container>
    </main>
  );
}
