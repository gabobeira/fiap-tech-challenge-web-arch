import { AuthData, AuthTokenModel } from "./auth.model";

export const postUserLogin = async (email: string, password: string) => {
  const res = await fetch("http://localhost:5000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (res.status === 401) {
    throw new Error("Sem autorização");
  }

  const response = await res.json();

  if (response?.message) {
    throw new Error(response.message);
  }

  const userData = response;

  if (userData) {
    const userTokenData = JSON.parse(
      userData.token.split("::")[1]
    ) as AuthTokenModel;
    return userTokenData;
  } else {
    throw new Error("Email ou senha inválidos");
  }
};

export const postUserRegister = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await fetch("http://localhost:5000/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    throw new Error("Erro ao criar conta");
  }

  const response = await res.json();

  if (response?.message) {
    throw new Error(response.message);
  }

  if (response?.user) {
    return new AuthData(response.user);
  } else {
    throw new Error("Conta inválida");
  }
};
