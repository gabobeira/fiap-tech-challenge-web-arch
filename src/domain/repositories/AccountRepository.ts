import { Observable } from "rxjs";
import { AccountData } from "../types/AccountTypes";

export interface AccountRepository {
  getAccountInfo(idUser: number): Observable<AccountData>;
}
