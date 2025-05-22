import { TransactionRepository } from "@/domain/repositories/TransactionRepository";
import {
  TransactionData,
  TransactionParams,
} from "@/domain/types/TransactionTypes";
import { Observable, from } from "rxjs";

export class TransactionRepositoryImpl implements TransactionRepository {
  private readonly baseUrl: string = "http://localhost:5000";

  getTransactions(): Observable<TransactionData[]> {
    return from(fetch(`${this.baseUrl}/transactions`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
        cache: "no-store",
      }).then((res) => res.json())
    )
  }

  createTransaction(
    transactionParams: TransactionParams
  ): Observable<TransactionData> {
    return from(

      fetch(`${this.baseUrl}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionParams),
      }).then((res) => res.json())
    )
  }

  updateTransaction(
    transactionData: TransactionData
  ): Observable<TransactionData> {
    return from(
      fetch(
        `${this.baseUrl}/transactions/${transactionData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transactionData),
        }
      ).then((res) => res.json())
    )
  }

  deleteTransaction(transactionId: string): Observable<void> {
    return from(
      fetch(`${this.baseUrl}/transactions/${transactionId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json())
    )
  }
}
