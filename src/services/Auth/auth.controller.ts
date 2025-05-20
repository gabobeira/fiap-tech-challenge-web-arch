import { AuthData, AuthModel } from "./auth.model";

export const postUserLogin = async (email: string, password: string) => {
  const res = await fetch("http://localhost:5000/auth/login", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const user: AuthModel = await res.json().then((res) => {
    email = res.data.user.email;
    password = res.data.user.password;
    return res.data.user;
  });

  if (user) {
    return new AuthData(user);
  } else {
    throw new Error("Invalid email or password");
  }
};

export const postUserRegister = async (email: string, password: string) => {
  const res = await fetch("http://localhost:5000/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const user: AuthModel = await res.json().then((res) => {
    email = res.data.user.email;
    password = res.data.user.password;
    return res.data.user;
  });

  if (user) {
    return new AuthData(user);
  } else {
    throw new Error("Invalid email or password");
  }
};
