import { firstValueFrom } from "rxjs";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";
import { UserRegisterParams } from "../types/UserType";

export class UserRegisterUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(params: UserRegisterParams): Promise<User> {
    return await firstValueFrom(this.userRepository.register(params));
  }
}
