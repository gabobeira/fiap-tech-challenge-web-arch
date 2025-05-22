import { User } from "@/domain/entities/User";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { UserToken } from "@/domain/types/UserType";
import { UserLoginUseCase } from "@/domain/usecases/UserLoginUseCase";
import { UserRegisterUseCase } from "@/domain/usecases/UserRegisterUseCase";
import { UserRepositoryImpl } from "@/infra/repositories/UserRepositoryImpl";

export const halfHourMs = 30 * 60 * 1000;

export class AuthController {
  private readonly userRepository: UserRepository;

  private readonly userLoginUseCase: UserLoginUseCase;
  private readonly userRegisterUseCase: UserRegisterUseCase;

  constructor() {
    this.userRepository = new UserRepositoryImpl();
    this.userLoginUseCase = new UserLoginUseCase(this.userRepository);
    this.userRegisterUseCase = new UserRegisterUseCase(this.userRepository);
  }

  private setToken(token: string) {
    if (typeof window === "undefined") return;

    const cookie = `auth_token=${token}; path=/; max-age=${halfHourMs};`;
    document.cookie = cookie;
  }

  async login(email: string, password: string): Promise<UserToken> {
    const res = await this.userLoginUseCase.execute({ email, password });

    this.setToken(JSON.stringify(res));
    return res;
  }

  async register(name: string, email: string, password: string): Promise<User> {
    return await this.userRegisterUseCase.execute({ name, email, password });
  }

  setTokenDataUser(dataUser: string) {
    if (typeof window === "undefined") return;
    const cookie = `auth_token=${dataUser}; path=/; max-age=${halfHourMs};`;
    document.cookie = cookie;
  }

  verifyExpirationToken(): boolean | null {
    const token = this.getToken();

    if (token) {
      const expirationTime = token.expirationTime;
      const currentExpitrationTime = new Date();

      if (
        currentExpitrationTime.getTime() > Number(expirationTime) ||
        (token.timestampNewExpiration &&
          Number(token.timestampNewExpiration) > expirationTime + halfHourMs)
      ) {
        this.logout();
        return true;
      }
    }
    return null;
  }

  getToken(): UserToken | null {
    if (typeof window === "undefined") return null;
    const cookies = document.cookie.split(/[\s;]/);

    const dataUserCookie = cookies.find((cookie) =>
      cookie.startsWith("auth_token=")
    );

    if (dataUserCookie) {
      const token = JSON.parse(dataUserCookie.split("=")[1]);
      return token as UserToken;
    }
    return null;
  }

  logout() {
    if (typeof window === "undefined") return;
    document.cookie = "dataUser=; expires=Thu, path=/; max-age=0;";
    document.cookie = "auth_token=; expires=Thu, path=/; max-age=0;";
  }

  isAuthenticated(): boolean {
    const token = this.getToken();

    return token ? true : false;
  }

  refreshTokenExpiration() {
    if (typeof window === "undefined") return;
    const token = this.getToken();
    if (!token) return;

    const now = Date.now();
    const newExpiration = now + halfHourMs;

    token.expirationTime = newExpiration;
    token.timestampNewExpiration = now;

    this.setToken(JSON.stringify(token));
  }
}
