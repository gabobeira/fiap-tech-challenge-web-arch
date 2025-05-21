import { TransactionRepository } from "@/domain/repositories/TransactionRepository";
import {
  TransactionData,
  TransactionParams,
} from "@/domain/types/TransactionTypes";

export class TransactionRepositoryImpl implements TransactionRepository {
  private readonly baseUrl: string = "http://localhost:5000";

  async getTransactions(): Promise<TransactionData[]> {
    const res = await fetch(`${this.baseUrl}/transactions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    return await res.json();
  }

  async createTransaction(
    transactionParams: TransactionParams
  ): Promise<TransactionData> {
    const res = await fetch(`${this.baseUrl}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactionParams),
    });

    return await res.json();
  }

  async updateTransaction(
    transactionData: TransactionData
  ): Promise<TransactionData> {
    const res = await fetch(
      `${this.baseUrl}/transactions/${transactionData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      }
    );

    return await res.json();
  }

  async deleteTransaction(transactionId: string): Promise<void> {
    await fetch(`${this.baseUrl}/transactions/${transactionId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
