import { Transaction } from "../entities/Transaction";
import { AccountRepository } from "../repositories/AccountRepository";
import { TransactionRepository } from "../repositories/TransactionRepository";
import { TransactionForm, TransactionParams } from "../types/TransactionTypes";

const DECREASE_BALANCE_TRANSACTION_TYPES = [
  "Saque",
  "Transferência",
  "Pagamento",
];
export class CreateTransactionUseCase {
  constructor(
    private readonly transactionRespository: TransactionRepository,
    private readonly accountRepository: AccountRepository
  ) {}

  async execute(
    transactionForm: TransactionForm,
    idUser: number
  ): Promise<Transaction> {
    const account = await this.accountRepository.getAccountInfo(idUser);

    const decreaseBalance = DECREASE_BALANCE_TRANSACTION_TYPES.includes(
      transactionForm.type
    );

    if (decreaseBalance && transactionForm.value > account.balance) {
      throw new Error("Saldo insuficiente");
    }

    const transactionParams: TransactionParams = {
      ...transactionForm,
      date: new Date().toISOString(),
      currency: account.currency,
      idAccount: account.id,
    };

    const data =
      await this.transactionRespository.createTransaction(transactionParams);

    return new Transaction(data);
  }
}
