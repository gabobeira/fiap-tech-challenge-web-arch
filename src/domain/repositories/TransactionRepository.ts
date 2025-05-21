import { Transaction } from "@/domain/entities/Transaction";
import { TransactionData, TransactionParams } from "@/types/Transaction.types";

export interface TransactionRepository {
  getTransactions(): Promise<Transaction[]>;
  createTransaction(transactionParams: TransactionParams): Promise<Transaction>;
  updateTransaction(transaction: TransactionData): Promise<Transaction>;
  deleteTransaction(transactionId: string): Promise<void>;
}
