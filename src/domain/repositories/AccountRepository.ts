import { Account } from "@/domain/entities/Account";

export interface AccountRepository {
  getAccountInfo(): Promise<Account>;
}
