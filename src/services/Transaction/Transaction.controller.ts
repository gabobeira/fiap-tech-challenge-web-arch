import { AuthService } from "../AuthService";
import {
  Transaction,
  TransactionData,
  TransactionInput,
} from "./Transaction.model";

const getAuthorization = () => {
  const authService = new AuthService();

  const token = authService.getToken();
  if (token) {
    return `Bearer ${token.token}`;
  }
};

export const getTransactions = async (idAccount: number) => {
  const res = await fetch(
    `http://localhost:5000/transactions/account/${idAccount}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthorization() || "",
      },
      cache: "no-store",
    }
  );

  if (res.status === 401) {
    throw new Error("Sem autorização");
  }

  const response: Transaction[] = await res.json().then((res) => {
    idAccount = res.data.idAccount;
    return res.data;
  });

  return response.map((transaction) => new Transaction(transaction));
};

export const addTransaction = async (transaction: TransactionInput) => {
  const res = await fetch("http://localhost:5000/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthorization() || "",
    },
    body: JSON.stringify(transaction),
  });

  if (res.status === 401) {
    throw new Error("Sem autorização");
  }

  const data: TransactionData = await res.json();

  return new Transaction(data);
};

export const editTransaction = async (transaction: TransactionData) => {
  const res = await fetch(
    `http://localhost:5000/transactions/${transaction.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthorization() || "",
      },
      body: JSON.stringify(transaction),
    }
  );

  if (res.status === 401) {
    throw new Error("Sem autorização");
  }

  const data: TransactionData = await res.json();

  return new Transaction(data);
};

export const deleteTransaction = async (transactionId: string) => {
  const res = await fetch(
    `http://localhost:5000/transactions/${transactionId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthorization() || "",
      },
    }
  );

  if (res.status === 401) {
    throw new Error("Sem autorização");
  }

  const data: TransactionData = await res.json();

  return new Transaction(data);
};
