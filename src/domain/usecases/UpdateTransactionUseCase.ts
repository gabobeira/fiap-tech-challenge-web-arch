import { Transaction } from "../entities/Transaction";
import { TransactionRepository } from "../repositories/TransactionRepository";
import { TransactionData } from "../types/TransactionTypes";

export class UpdateTransactionUseCase {
  constructor(private readonly transactionRespository: TransactionRepository) {}

  async execute(transactionData: TransactionData): Promise<Transaction> {
    const data =
      await this.transactionRespository.updateTransaction(transactionData);

    return new Transaction(data);
  }
}
