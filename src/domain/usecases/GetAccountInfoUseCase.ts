import { Account } from "../entities/Account";
import { AccountRepository } from "../repositories/AccountRepository";

export class GetAccountInfoUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(): Promise<Account> {
    const data = await this.accountRepository.getAccountInfo();

    return new Account(data);
  }
}
