import { AccountRepository } from "@/domain/repositories/AccountRepository";
import { AccountData } from "@/domain/types/AccountTypes";

export class AccountRepositoryImpl implements AccountRepository {
  private readonly baseUrl: string = "http://localhost:5000";

  async getAccountInfo(): Promise<AccountData> {
    const res = await fetch(`${this.baseUrl}/account`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await res.json();
  }
}
