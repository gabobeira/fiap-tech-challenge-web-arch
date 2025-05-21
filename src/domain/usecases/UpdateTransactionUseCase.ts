import { TransactionData } from "@/types/Transaction.types";
import { Transaction } from "../entities/Transaction";
import { TransactionRepository } from "../repositories/TransactionRepository";

export class UpdateTransactionUseCase {
  constructor(private readonly transactionRespository: TransactionRepository) {}

  async execute(transaction: TransactionData): Promise<Transaction> {
    return await this.transactionRespository.updateTransaction(transaction);
  }
}
