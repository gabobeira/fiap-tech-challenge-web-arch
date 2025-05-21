import { Account } from "@/domain/entities/Account";
import { AccountRepository } from "@/domain/repositories/AccountRepository";
import { AccountData } from "@/types/Account.types";

export class AccountRepositoryImpl implements AccountRepository {
  private readonly baseUrl: string = "http://localhost:5000/";

  async getAccountInfo(): Promise<Account> {
    const res = await fetch(`${this.baseUrl}/account`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: AccountData = await res.json();

    return new Account(data);
  }
}
