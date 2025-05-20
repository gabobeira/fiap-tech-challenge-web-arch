import { Account } from "./Account.model";

export const getAccountInfo = async (idAcount: number) => {
  const res = await fetch(`http://localhost:5000/accounts/id/${idAcount}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data: Account = await res.json().then((res) => {
    res.data.account.id = idAcount;
    return res.data.account;
  });

  return new Account(data);
};
