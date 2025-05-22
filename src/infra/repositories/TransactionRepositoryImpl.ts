import { TransactionRepository } from "@/domain/repositories/TransactionRepository";
import {
  TransactionData,
  TransactionParams,
} from "@/domain/types/TransactionTypes";
import { AuthController } from "@/presentation/controllers/AuthController";

export class TransactionRepositoryImpl implements TransactionRepository {
  private readonly baseUrl: string = "http://localhost:5000";

  private getAuthorization() {
    const authService = new AuthController();

    const token = authService.getToken();
    if (token) {
      return `Bearer ${token.token}`;
    }
  }

  async getTransactions(idAccount: number): Promise<TransactionData[]> {
    const res = await fetch(
      `${this.baseUrl}/transactions/account/${idAccount}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.getAuthorization() || "",
        },
        cache: "no-store",
      }
    );

    if (res.status === 401) {
      throw new Error("Sem autorização");
    }

    return await res.json().then((res) => {
      idAccount = res.data.idAccount;
      return res.data;
    });
  }

  async createTransaction(
    transactionParams: TransactionParams
  ): Promise<TransactionData> {
    const res = await fetch(`${this.baseUrl}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.getAuthorization() || "",
      },
      body: JSON.stringify(transactionParams),
    });

    if (res.status === 401) {
      throw new Error("Sem autorização");
    }

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
          Authorization: this.getAuthorization() || "",
        },
        body: JSON.stringify(transactionData),
      }
    );

    if (res.status === 401) {
      throw new Error("Sem autorização");
    }

    return await res.json();
  }

  async deleteTransaction(transactionId: string): Promise<void> {
    const res = await fetch(`${this.baseUrl}/transactions/${transactionId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.getAuthorization() || "",
      },
    });

    if (res.status === 401) {
      throw new Error("Sem autorização");
    }
  }
}
