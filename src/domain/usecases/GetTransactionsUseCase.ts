import { Transaction } from "../entities/Transaction";
import { TransactionRepository } from "../repositories/TransactionRepository";

export class GetTransactionsUseCase {
  constructor(private readonly transactionRespository: TransactionRepository) {}

  async execute(): Promise<Transaction[]> {
    return await this.transactionRespository.getTransactions();
  }
}
