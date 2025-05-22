import { Account } from "@/domain/entities/Account";
import { AccountRepository } from "@/domain/repositories/AccountRepository";
import { GetAccountInfoUseCase } from "@/domain/usecases/GetAccountInfoUseCase";
import { AccountRepositoryImpl } from "@/infra/repositories/AccountRepositoryImpl";
import { map, Observable } from "rxjs";

export class AccountController {
  private readonly accountRepository: AccountRepository;
  private readonly getAccountInfoUseCase: GetAccountInfoUseCase;

  constructor() {
    this.accountRepository = new AccountRepositoryImpl();
    this.getAccountInfoUseCase = new GetAccountInfoUseCase(
      this.accountRepository
    );
  }

getAccountInfo() {
  return this.getAccountInfoUseCase.execute().pipe(
    map((account: Account) => ({
      fullName: account.getFullName(),
      firstName: account.getFirstName(),
      balance: account.getBalance(),
      currency: account.getCurrency(),
    }))
  );
}
}
