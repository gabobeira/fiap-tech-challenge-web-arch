import { postUserLogin } from "./Auth/auth.controller";
import { AuthTokenModel } from "./Auth/auth.model";

export const msExpirationToken = 30 * 60 * 1000;

export class AuthService {
  async login(email: string, password: string): Promise<AuthTokenModel> {
    const res = await postUserLogin(email, password);

    this.setToken(JSON.stringify(res));
    return res;
  }

  private setToken(token: string) {
    if (typeof window === "undefined") return;
    const cookie = `auth_token=${token}; path=/; max-age=${msExpirationToken};`;
    document.cookie = cookie;
  }

  setTokenDataUser(dataUser: string) {
    if (typeof window === "undefined") return;
    const cookie = `auth_token=${dataUser}; path=/; max-age=${msExpirationToken};`;
    document.cookie = cookie;
  }

  verifyExpirationToken(): boolean | null {
    const token = this.getToken();

    if (token) {
      const expiration = token.expirationTime;

      const atualExpitration = new Date();

      if (
        atualExpitration.getTime() > Number(expiration) ||
        (token.timestampNewExpiration &&
          Number(token.timestampNewExpiration) > expiration + msExpirationToken)
      ) {
        this.logout();
        return true;
      }
    }
    return null;
  }

  getToken(): AuthTokenModel | null {
    if (typeof window === "undefined") return null;
    const cookies = document.cookie.split(";");

    const dataUserCookie = cookies.find((cookie) =>
      cookie.startsWith("auth_token=")
    );

    if (dataUserCookie) {
      const token = JSON.parse(dataUserCookie.split("=")[1]);
      return token as AuthTokenModel;
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
    const newExpiration = now + msExpirationToken;

    token.expirationTime = newExpiration;
    token.timestampNewExpiration = now;

    this.setToken(JSON.stringify(token));
  }
}
