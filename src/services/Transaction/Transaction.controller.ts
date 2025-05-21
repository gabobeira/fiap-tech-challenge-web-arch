import {
  Transaction,
  TransactionData,
  TransactionInput,
} from "./Transaction.model";
import { catchError, from, map, of, switchMap } from 'rxjs'

export const getTransactions = () => {
  return from(
    fetch("http://localhost:5000/transactions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }).then(res => res.json())
  ).pipe(
    map((response: Transaction[]) => {
      return response.map((transaction) => new Transaction(transaction));
    }),
    catchError((error) => {
      console.error('Erro ao buscar transações:', error);
      return [];
    })
  );
};

export const addTransaction = (transaction: TransactionInput) => {
  return from(
    fetch("http://localhost:5000/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaction),
  })
  )
  .pipe(
    map((res) => {
      return from(res.json()).pipe(
        map((data: TransactionData) => new Transaction(data)),
      )
    }),
    catchError((error) => {
      console.error("Erro na requisição", error);
      throw error;
    })
  );
};

export const editTransaction = (transaction: TransactionData) => {
  return from(
    fetch(`http://localhost:5000/transactions/${transaction.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    })
  ).pipe(
    switchMap(async (res) => {
      if (!res.ok) {
        throw new Error(`Erro ao editar transação: ${res.statusText}`);
      }
      const data = await res.json();
      return new Transaction(data);
    }),
    catchError((error) => {
      console.error('Erro ao editar transação:', error);
      return of(null);
    })
  );
};

export const deleteTransaction = (transactionId: string) => {
  return from(
    fetch(`http://localhost:5000/transactions/${transactionId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).pipe(
    switchMap(async (res) => {
      if (!res.ok) {
        throw new Error('Falha ao deletar transação');
      }
      const data: TransactionData = await res.json();
      return new Transaction(data);
    }),
    catchError((error) => {
      console.error('Erro na requisição: ', error);
      return of(null)
    })
  );
};
