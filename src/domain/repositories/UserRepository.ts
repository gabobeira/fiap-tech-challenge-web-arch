import { Observable } from "rxjs";
import { User } from "../entities/User";
import {
  UserLoginParams,
  UserRegisterParams,
  UserToken,
} from "../types/UserType";

export interface UserRepository {
  login(params: UserLoginParams): Observable<UserToken>;
  register(params: UserRegisterParams): Observable<User>;
}
