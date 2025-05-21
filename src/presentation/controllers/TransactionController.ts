import { Transaction } from "@/domain/entities/Transaction";
import { AccountRepository } from "@/domain/repositories/AccountRepository";
import { TransactionRepository } from "@/domain/repositories/TransactionRepository";
import {
  TransactionData,
  TransactionForm,
} from "@/domain/types/TransactionTypes";
import { CreateTransactionUseCase } from "@/domain/usecases/CreateTransactionUseCase";
import { DeleteTransactionUseCase } from "@/domain/usecases/DeleteTransactionUseCase";
import { GetTransactionsUseCase } from "@/domain/usecases/GetTransactionsUseCase";
import { UpdateTransactionUseCase } from "@/domain/usecases/UpdateTransactionUseCase";
import { AccountRepositoryImpl } from "@/infra/repositories/AccountRepositoryImpl";
import { TransactionRepositoryImpl } from "@/infra/repositories/TransactionRepositoryImpl";

export class TransactionController {
  private readonly accountRepository: AccountRepository;
  private readonly transactionRepository: TransactionRepository;

  private readonly getTransactionsUseCase: GetTransactionsUseCase;
  private readonly createTransactionUseCase: CreateTransactionUseCase;
  private readonly updateTransactionUseCase: UpdateTransactionUseCase;
  private readonly deleteTransactionUseCase: DeleteTransactionUseCase;

  constructor() {
    this.accountRepository = new AccountRepositoryImpl();
    this.transactionRepository = new TransactionRepositoryImpl();

    this.getTransactionsUseCase = new GetTransactionsUseCase(
      this.transactionRepository
    );
    this.createTransactionUseCase = new CreateTransactionUseCase(
      this.transactionRepository,
      this.accountRepository
    );
    this.updateTransactionUseCase = new UpdateTransactionUseCase(
      this.transactionRepository
    );
    this.deleteTransactionUseCase = new DeleteTransactionUseCase(
      this.transactionRepository
    );
  }

  private getTransactionData(transaction: Transaction) {
    const transactionData = {
      id: transaction.getId(),
      date: transaction.getDate(),
      value: transaction.getValue(),
      currency: transaction.getCurrency(),
      type: transaction.getType(),
    };

    if (transaction.getFileBase64() && transaction.getFileName()) {
      return {
        ...transactionData,
        fileBase64: transaction.getFileBase64(),
        fileName: transaction.getFileName(),
      };
    }

    return transactionData;
  }

  async getTransactions() {
    const transactions = await this.getTransactionsUseCase.execute();

    return transactions.map((transaction) =>
      this.getTransactionData(transaction)
    );
  }

  async addTransaction(transactionForm: TransactionForm) {
    const transaction =
      await this.createTransactionUseCase.execute(transactionForm);

    return this.getTransactionData(transaction);
  }

  async editTransaction(transactionData: TransactionData) {
    const transaction =
      await this.updateTransactionUseCase.execute(transactionData);

    return this.getTransactionData(transaction);
  }

  async removeTransaction(transactionId: string) {
    await this.deleteTransactionUseCase.execute(transactionId);
  }
}
