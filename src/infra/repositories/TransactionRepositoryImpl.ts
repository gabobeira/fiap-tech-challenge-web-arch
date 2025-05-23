import { TransactionRepository } from "@/domain/repositories/TransactionRepository";
import {
  TransactionData,
  TransactionParams,
} from "@/domain/types/TransactionTypes";
import { AuthController } from "@/presentation/controllers/AuthController";
import { Observable, from, switchMap, throwError, map, catchError } from "rxjs";

export class TransactionRepositoryImpl implements TransactionRepository {
  private readonly baseUrl: string = "http://localhost:5000";

  private getAuthorization() {
    const authService = new AuthController();

    const token = authService.getToken();
    if (token) {
      return `Bearer ${token.token}`;
    }
  }

  getTransactions(idAccount: number): Observable<TransactionData[]> {
    return from(
      fetch(`${this.baseUrl}/transactions/account/${idAccount}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.getAuthorization() || "",
        },
        cache: "no-store",
      })
    ).pipe(
      switchMap((res) => {
        if (res.status === 401) {
          return throwError(() => new Error("Sem autorização"));
        }
        return from(res.json());
      }),
      map((json) => {
        return json.data as TransactionData[];
      }),
      catchError((err) => {
        console.error("Erro ao buscar transações:", err);
        return throwError(() => err);
      })
    );
  }

  createTransaction(
    transactionParams: TransactionParams
  ): Observable<TransactionData> {
    return from(
      fetch(`${this.baseUrl}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.getAuthorization() || "",
        },
        body: JSON.stringify(transactionParams),
      })
    ).pipe(
      switchMap((res) => {
        if (res.status === 401) {
          return throwError(() => new Error("Sem autorização"));
        }
        return from(res.json());
      })
    );
  }

  updateTransaction(transactionData: TransactionData) {
    return from(
      fetch(`${this.baseUrl}/transactions/${transactionData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.getAuthorization() || "",
        },
        body: JSON.stringify(transactionData),
      })
    ).pipe(
      switchMap((res) => {
        if (res.status === 401) {
          return throwError(() => new Error("Sem autorização"));
        }
        return from(res.json());
      })
    );
  }

  deleteTransaction(transactionId: string) {
    const url = `${this.baseUrl}/transactions/${transactionId}`;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.getAuthorization() || "",
      },
    };

    return from(fetch(url, options)).pipe(
      map((res) => {
        if (res.status === 401) {
          throw new Error("Sem autorização");
        }
        return;
      })
    );
  }
}
