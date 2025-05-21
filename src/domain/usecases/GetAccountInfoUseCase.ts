import { Account } from "../entities/Account";
import { AccountRepository } from "../repositories/AccountRepository";

export class GetAccountInfoUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(): Promise<Account> {
    return await this.accountRepository.getAccountInfo();
  }
}
