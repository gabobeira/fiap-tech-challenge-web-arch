"use client";
import {
  FModal,
  FTransactionForm,
  FTransactionFormCard,
  FTransactionListCard,
  TransactionItem,
} from "@/components";

import { AccountData } from "@/domain/types/AccountTypes";
import {
  TransactionData,
  TransactionForm,
} from "@/domain/types/TransactionTypes";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { Grid } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { image } from "../../../../../public/assets/image";

type TransactionsContainerProps = {
  accountBalance: AccountData["balance"];
  transactionList: TransactionData[];
  submitAddTransaction?: (transaction: TransactionForm) => void;
  submitEditTransaction?: (transaction: TransactionData) => void;
  submitDeleteTransaction?: (transactionId: string) => void;
};

export default function TransactionsContainer({
  accountBalance,
  transactionList,
  submitAddTransaction,
  submitEditTransaction,
  submitDeleteTransaction,
}: TransactionsContainerProps) {
  const formattedTransactions: TransactionItem[] = transactionList.map(
    (transaction) => ({
      id: transaction.id,
      type: transaction.type,
      formattedDate: formatDate(transaction.date),
      formattedValue: formatCurrency(transaction.value, transaction.currency),
    })
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] =
    useState<TransactionData>();

  const openEditModal = (transactionId: string) => {
    setCurrentTransaction(
      transactionList.find(({ id }) => id === transactionId)
    );

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
          accountBalance={accountBalance}
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
          accountBalance={accountBalance}
          currentTransaction={currentTransaction}
          editTransaction={submitEditTransaction}
          closeEditModal={() => setIsModalOpen(false)}
          buttonText="Concluir edição"
        />
      </FModal>
    </>
  );
}
