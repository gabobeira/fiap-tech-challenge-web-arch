import { AccountRepository } from "@/domain/repositories/AccountRepository";
import { AccountData } from "@/domain/types/AccountTypes";
import { AuthController } from "@/presentation/controllers/AuthController";
import { Observable, from, switchMap, throwError, map, catchError } from "rxjs";

export class AccountRepositoryImpl implements AccountRepository {
  private readonly baseUrl: string = "http://localhost:5000";

  private getAuthorization() {
    const authService = new AuthController();

    const token = authService.getToken();
    if (token) {
      return `Bearer ${token.token}`;
    }
  }

  getAccountInfo(idUser: number): Observable<AccountData> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: this.getAuthorization() || "",
    };

    return from(
      fetch(`${this.baseUrl}/accounts/user/${idUser}`, {
        method: "GET",
        headers,
      })
    ).pipe(
      switchMap((res) => {
        if (res.status === 401) {
          return throwError(() => new Error("Sem autorização"));
        }
        return from(res.json());
      }),
      map((res: any) => {
        const result = res.data.find((resp: AccountData) => resp.idUser === idUser);
        if (!result) {
          throw new Error("Conta não encontrada");
        }
        return result;
      }),
      catchError((err) => throwError(() => err))
    );
  }
}
