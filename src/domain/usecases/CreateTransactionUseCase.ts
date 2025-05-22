import { firstValueFrom } from "rxjs";
import { Transaction } from "../entities/Transaction";
import { AccountRepository } from "../repositories/AccountRepository";
import { TransactionRepository } from "../repositories/TransactionRepository";
import { TransactionForm, TransactionParams } from "../types/TransactionTypes";

export class CreateTransactionUseCase {
  constructor(
    private readonly transactionRespository: TransactionRepository,
    private readonly accountRepository: AccountRepository
  ) {}

  async execute(transactionForm: TransactionForm): Promise<Transaction> {
    const account = await firstValueFrom(this.accountRepository.getAccountInfo());

    const transactionParams: TransactionParams = {
      ...transactionForm,
      date: new Date().toISOString(),
      currency: account.currency,
    };

    const data =
      await firstValueFrom(this.transactionRespository.createTransaction(transactionParams));

    return new Transaction(data);
  }
}
