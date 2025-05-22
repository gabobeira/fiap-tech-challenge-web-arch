import { Observable } from "rxjs";
import { AccountData } from "../types/AccountTypes";

export interface AccountRepository {
  getAccountInfo(): Observable<AccountData>;
}
