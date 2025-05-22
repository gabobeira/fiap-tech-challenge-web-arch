import { TransactionRepository } from "../repositories/TransactionRepository";

export class DeleteTransactionUseCase {
  constructor(private readonly transactionRespository: TransactionRepository) {}

  async execute(transactionId: string): Promise<void> {
    await this.transactionRespository.deleteTransaction(transactionId);
  }
}
