import { TransactionParams } from "@/types/Transaction.types";
import { Transaction } from "../entities/Transaction";
import { TransactionRepository } from "../repositories/TransactionRepository";

export class CreateTransactionUseCase {
  constructor(private readonly transactionRespository: TransactionRepository) {}

  async execute(transactionParams: TransactionParams): Promise<Transaction> {
    return await this.transactionRespository.createTransaction(
      transactionParams
    );
  }
}
