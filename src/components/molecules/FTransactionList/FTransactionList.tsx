import {
  FTransactionItem,
  TransactionItem,
} from "@/components/molecules/FTransactionItem/FTransactionItem";
import { Box, List, Pagination, Stack, Typography } from "@mui/material";
import { useState } from "react";

export interface FTransactionListProps {
  transactionItems: TransactionItem[];
  deleteTransaction?: (transactionId: string) => void;
  editTransaction?: (transactionId: string) => void;
}

export function FTransactionList({
  transactionItems,
  editTransaction,
  deleteTransaction,
}: FTransactionListProps) {
  const ITEMS_PER_PAGE = 6;
  const [page, setPage] = useState(1);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const paginatedItems = transactionItems
    .reverse()
    .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleDelete = (transactionId: string) => {
    if (!deleteTransaction) {
      return;
    }
    deleteTransaction(transactionId);
  };

  return (
    <>
      {transactionItems.length > 0 ? (
        <Stack>
          <List>
            {paginatedItems.map(
              ({ id, formattedDate, type, formattedValue, fileName }) => (
                <FTransactionItem
                  key={`transaction-item-${id}`}
                  formattedDate={formattedDate}
                  formattedValue={formattedValue}
                  type={type}
                  fileName={fileName}
                  onDelete={() => handleDelete(id)}
                  onEdit={() => editTransaction && editTransaction(id)}
                />
              )
            )}
          </List>
          <Box marginTop={2} alignSelf="center">
            <Pagination
              count={Math.ceil(transactionItems.length / ITEMS_PER_PAGE)}
              page={page}
              onChange={(_, page) => handleChangePage(page)}
              showFirstButton
              showLastButton
            />
          </Box>
        </Stack>
      ) : (
        <Typography variant="body1" color="textLight">
          Nenhuma transação encontrada.
        </Typography>
      )}
    </>
  );
}
