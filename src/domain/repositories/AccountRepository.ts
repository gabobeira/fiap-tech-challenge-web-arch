import { AccountData } from "../types/AccountTypes";

export interface AccountRepository {
  getAccountInfo(idUser: number): Promise<AccountData>;
}
