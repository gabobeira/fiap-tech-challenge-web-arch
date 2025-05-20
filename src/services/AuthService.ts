import { postUserLogin } from "./Auth/auth.controller";
import { AuthData } from "./Auth/auth.model";

export class AuthService {
  async login(email: string, password: string): Promise<AuthData> {
    const res = await postUserLogin(email, password);

    this.setToken(JSON.stringify(res));
    return res;
  }

  private setToken(token: string) {
    const cookie = `token=${token}; path=/; max-age=3600;`;
    document.cookie = cookie;
  }

  getToken(): string | null {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));
    if (tokenCookie) {
      return tokenCookie.split("=")[1];
    }
    return null;
  }

  logout() {
    document.cookie = "token=; expires=Thu, path=/; max-age=0;";
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
