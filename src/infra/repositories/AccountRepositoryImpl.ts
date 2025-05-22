import { AccountRepository } from "@/domain/repositories/AccountRepository";
import { AccountData } from "@/domain/types/AccountTypes";
import { AuthController } from "@/presentation/controllers/AuthController";

export class AccountRepositoryImpl implements AccountRepository {
  private readonly baseUrl: string = "http://localhost:5000";

  private getAuthorization() {
    const authService = new AuthController();

    const token = authService.getToken();
    if (token) {
      return `Bearer ${token.token}`;
    }
  }

  async getAccountInfo(idUser: number): Promise<AccountData> {
    const res = await fetch(`${this.baseUrl}/accounts/user/${idUser}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.getAuthorization() || "",
      },
    });

    if (res.status === 401) {
      throw new Error("Sem autorização");
    }

    return await res
      .json()
      .then((res) =>
        res.data.find((resp: AccountData) => resp.idUser === idUser)
      );
  }
}
