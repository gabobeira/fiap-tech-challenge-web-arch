import { Transaction } from "../entities/Transaction";
import { AccountRepository } from "../repositories/AccountRepository";
import { TransactionRepository } from "../repositories/TransactionRepository";
import { TransactionForm, TransactionParams } from "../types/TransactionTypes";

export class CreateTransactionUseCase {
  constructor(
    private readonly transactionRespository: TransactionRepository,
    private readonly accountRepository: AccountRepository
  ) {}

  async execute(
    transactionForm: TransactionForm,
    idUser: number
  ): Promise<Transaction> {
    const account = await this.accountRepository.getAccountInfo(idUser);

    const transactionParams: TransactionParams = {
      ...transactionForm,
      date: new Date().toISOString(),
      currency: account.currency,
      idAccount: account.id,
    };

    const data =
      await this.transactionRespository.createTransaction(transactionParams);

    return new Transaction(data);
  }
}
