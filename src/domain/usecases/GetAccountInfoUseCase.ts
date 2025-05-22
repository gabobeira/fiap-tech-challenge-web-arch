import { Account } from "../entities/Account";
import { AccountRepository } from "../repositories/AccountRepository";

export class GetAccountInfoUseCase {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(idUser: number): Promise<Account> {
    const data = await this.accountRepository.getAccountInfo(idUser);

    return new Account(data);
  }
}
