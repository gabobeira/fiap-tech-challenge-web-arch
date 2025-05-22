import { firstValueFrom, map, Observable } from "rxjs";
import { Account } from "../entities/Account";
import { AccountRepository } from "../repositories/AccountRepository";
import { AccountData } from "../types/AccountTypes";

export class GetAccountInfoUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  execute(): Observable<Account> {
    return this.accountRepository.getAccountInfo().pipe(
      map((data: AccountData) => new Account(data))
    );
  }
}
