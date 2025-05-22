import { firstValueFrom } from "rxjs";
import { TransactionRepository } from "../repositories/TransactionRepository";

export class DeleteTransactionUseCase {
  constructor(private readonly transactionRespository: TransactionRepository) {}

  async execute(transactionId: string): Promise<void> {
    await firstValueFrom(this.transactionRespository.deleteTransaction(transactionId));
  }
}
