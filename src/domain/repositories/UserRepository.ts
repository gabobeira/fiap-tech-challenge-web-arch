import { User } from "../entities/User";
import {
  UserLoginParams,
  UserRegisterParams,
  UserToken,
} from "../types/UserType";

export interface UserRepository {
  login(params: UserLoginParams): Promise<UserToken>;
  register(params: UserRegisterParams): Promise<User>;
}
