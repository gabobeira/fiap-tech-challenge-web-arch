import { UserRepository } from "../repositories/UserRepository";
import { UserLoginParams, UserToken } from "../types/UserType";

export class UserLoginUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(params: UserLoginParams): Promise<UserToken> {
    return await this.userRepository.login(params);
  }
}
