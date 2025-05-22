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
import { from, map } from "rxjs";

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

  private static getTransactionData(transaction: Transaction) {
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

  getTransactions() {
    return from(this.getTransactionsUseCase.execute()).pipe(
    map((transactions) =>
      transactions.map((transaction) =>
        TransactionController.getTransactionData(transaction)
      )
    )
  );
  }

  async addTransaction(transactionForm: TransactionForm) {
    const transaction =
      await this.createTransactionUseCase.execute(transactionForm);

    return TransactionController.getTransactionData(transaction);
  }

  async editTransaction(transactionData: TransactionData) {
    const transaction =
      await this.updateTransactionUseCase.execute(transactionData);

    return TransactionController.getTransactionData(transaction);
  }

  async removeTransaction(transactionId: string) {
    await this.deleteTransactionUseCase.execute(transactionId);
  }
}
