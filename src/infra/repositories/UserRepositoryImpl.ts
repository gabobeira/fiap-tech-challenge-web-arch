import { User } from "@/domain/entities/User";
import { UserRepository } from "@/domain/repositories/UserRepository";
import {
  UserLoginParams,
  UserRegisterParams,
  UserToken,
} from "@/domain/types/UserType";
import { Observable, from, switchMap, throwError, catchError } from "rxjs";

export class UserRepositoryImpl implements UserRepository {
  private readonly baseUrl: string = "http://localhost:5000";

  login({ email, password }: UserLoginParams): Observable<UserToken> {
    return from(
      fetch(`${this.baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
    ).pipe(
      switchMap((res) => {
        if (res.status === 401) {
          return throwError(() => new Error("Sem autorização"));
        }
        return from(res.json()).pipe(
          switchMap((response) => {
            if (response?.message) {
              return throwError(() => new Error(response.message));
            }
            const userData = response;
            if (userData) {
              const userTokenData = JSON.parse(
                userData.token.split("::")[1]
              ) as UserToken;
              return new Observable<UserToken>((subscriber) => {
                subscriber.next(userTokenData);
                subscriber.complete();
              });
            } else {
              return throwError(() => new Error("Email ou senha inválidos"));
            }
          })
        );
      }),
      catchError((err) => throwError(() => err))
    );
  }

  register({ name, email, password }: UserRegisterParams): Observable<User> {
    return from(
      fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })
    ).pipe(
      switchMap((response) => {
        if (!response.ok) {
          return throwError(() => new Error("Erro ao criar conta"));
        }
        return response.json();
      }),
      switchMap((response) => {
        if (response?.message) {
          return throwError(() => new Error(response.message));
        }
        if (response?.user) {
          return new Observable<User>((subscriber) => {
            subscriber.next(new User(response.user));
            subscriber.complete();
          });
        } else {
          return throwError(() => new Error("Conta inválida"));
        }
      })
    );
  }
}
