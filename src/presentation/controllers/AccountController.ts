import { Account } from "@/domain/entities/Account";
import { AccountRepository } from "@/domain/repositories/AccountRepository";
import { GetAccountInfoUseCase } from "@/domain/usecases/GetAccountInfoUseCase";
import { AccountRepositoryImpl } from "@/infra/repositories/AccountRepositoryImpl";

export class AccountController {
  private readonly accountRepository: AccountRepository;
  private readonly getAccountInfoUseCase: GetAccountInfoUseCase;

  constructor() {
    this.accountRepository = new AccountRepositoryImpl();
    this.getAccountInfoUseCase = new GetAccountInfoUseCase(
      this.accountRepository
    );
  }

  async getAccountInfo(idUser: number) {
    const account: Account = await this.getAccountInfoUseCase.execute(idUser);

    return {
      id: account.getId(),
      idUser: account.getIdUser(),
      fullName: account.getFullName(),
      firstName: account.getFirstName(),
      balance: account.getBalance(),
      currency: account.getCurrency(),
      investments: account.getInvestments(),
    };
  }
}
