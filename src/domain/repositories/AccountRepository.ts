import { AccountData } from "../types/AccountTypes";

export interface AccountRepository {
  getAccountInfo(): Promise<AccountData>;
}
