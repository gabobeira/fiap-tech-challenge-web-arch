import { Observable } from "rxjs";
import { TransactionData, TransactionParams } from "../types/TransactionTypes";

export interface TransactionRepository {
  getTransactions(): Observable<TransactionData[]>;
  createTransaction(
    transactionParams: TransactionParams
  ): Observable<TransactionData>;
  updateTransaction(transactionData: TransactionData): Observable<TransactionData>;
  deleteTransaction(transactionId: string): Observable<void>;
}
