import { AccountRepository } from "@/domain/repositories/AccountRepository";
import { AccountData } from "@/domain/types/AccountTypes";
import { from, Observable } from 'rxjs'

export class AccountRepositoryImpl implements AccountRepository {
  private readonly baseUrl: string = "http://localhost:5000";

  getAccountInfo(): Observable<AccountData> {
    return from(
      fetch(`${this.baseUrl}/account`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json())
    );
  }
}
