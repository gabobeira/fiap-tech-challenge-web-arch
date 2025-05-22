import { AuthService } from "../AuthService";
import { Account } from "./Account.model";

const getAuthorization = () => {
  const authService = new AuthService();

  const token = authService.getToken();
  if (token) {
    return `Bearer ${token.token}`;
  }
};

export const getAccountInfo = async (idUser: number) => {
  const res = await fetch(`http://localhost:5000/accounts/user/${idUser}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthorization() || "",
    },
  });

  if (res.status === 401) {
    throw new Error("Sem autorização");
  }

  const data: Account = await res.json().then((res) => {
    const account = res.data.find((resp: Account) => resp.idUser === idUser);

    return account;
  });

  return new Account(data);
};
