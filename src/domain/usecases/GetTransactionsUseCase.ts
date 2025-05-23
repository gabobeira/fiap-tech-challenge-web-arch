import { firstValueFrom } from "rxjs";
import { Transaction } from "../entities/Transaction";
import { TransactionRepository } from "../repositories/TransactionRepository";

export class GetTransactionsUseCase {
  constructor(private readonly transactionRespository: TransactionRepository) {}

  async execute(idAccount: number): Promise<Transaction[]> {
    const data = await firstValueFrom(this.transactionRespository.getTransactions(idAccount));

    return data.map((transaction) => new Transaction(transaction));
  }
}
