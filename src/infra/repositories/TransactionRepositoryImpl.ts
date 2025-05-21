import { Transaction } from "@/domain/entities/Transaction";
import { TransactionRepository } from "@/domain/repositories/TransactionRepository";
import { TransactionData, TransactionParams } from "@/types/Transaction.types";

export class TransactionRepositoryImpl implements TransactionRepository {
  private readonly baseUrl: string = "http://localhost:5000/";

  async getTransactions(): Promise<Transaction[]> {
    const res = await fetch(`${this.baseUrl}/transactions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const response: TransactionData[] = await res.json();

    return response.map((transaction) => new Transaction(transaction));
  }

  async createTransaction(
    transactionParams: TransactionParams
  ): Promise<Transaction> {
    const res = await fetch(`${this.baseUrl}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactionParams),
    });

    const data: TransactionData = await res.json();

    return new Transaction(data);
  }

  async updateTransaction(transaction: TransactionData): Promise<Transaction> {
    const res = await fetch(`${this.baseUrl}/transactions/${transaction.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    });

    const data: TransactionData = await res.json();

    return new Transaction(data);
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
