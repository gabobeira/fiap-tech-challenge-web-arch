"use client";
import {
  FModal,
  FTransactionForm,
  FTransactionFormCard,
  FTransactionListCard,
  TransactionItem,
} from "@/components";

import {
  TransactionData,
  TransactionForm,
} from "@/domain/types/TransactionTypes";
import { useAccountStore } from "@/stores/AccountStore";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { Grid } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { image } from "../../../../../public/assets/image";

type TransactionsContainerProps = {
  submitAddTransaction?: (transaction: TransactionForm) => void;
  submitEditTransaction?: (transaction: TransactionData) => void;
  submitDeleteTransaction?: (transactionId: string) => void;
};

export default function TransactionsContainer({
  submitAddTransaction,
  submitEditTransaction,
  submitDeleteTransaction,
}: TransactionsContainerProps) {
  const { account, transactions } = useAccountStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] =
    useState<TransactionData>();

  const formattedTransactions: TransactionItem[] = transactions.map(
    (transaction) => ({
      id: transaction.id,
      type: transaction.type,
      formattedDate: formatDate(transaction.date),
      formattedValue: formatCurrency(transaction.value, transaction.currency),
    })
  );

  const openEditModal = (transactionId: string) => {
    setCurrentTransaction(transactions.find(({ id }) => id === transactionId));
    setIsModalOpen(true);
  };

  return (
    <>
      <Grid
        size={{ xs: 12, lg: 6 }}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <FTransactionFormCard
          addTransaction={submitAddTransaction}
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
      <FModal
        title="Editar transação"
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      >
        <FTransactionForm
          accountBalance={account.balance}
          currentTransaction={currentTransaction}
          editTransaction={submitEditTransaction}
          closeEditModal={() => setIsModalOpen(false)}
          buttonText="Concluir edição"
        />
      </FModal>
    </>
  );
}
