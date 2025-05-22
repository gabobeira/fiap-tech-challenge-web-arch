import { User } from "@/domain/entities/User";
import { UserRepository } from "@/domain/repositories/UserRepository";
import {
  UserLoginParams,
  UserRegisterParams,
  UserToken,
} from "@/domain/types/UserType";

export class UserRepositoryImpl implements UserRepository {
  private readonly baseUrl: string = "http://localhost:5000";

  async login({ email, password }: UserLoginParams): Promise<UserToken> {
    const res = await fetch(`${this.baseUrl}/auth/login`, {
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
      ) as UserToken;
      return userTokenData;
    } else {
      throw new Error("Email ou senha inválidos");
    }
  }

  async register({ name, email, password }: UserRegisterParams): Promise<User> {
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
      return new User(response.user);
    } else {
      throw new Error("Conta inválida");
    }
  }
}
