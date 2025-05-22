import { UserData } from "../types/UserType";

export class User {
  private readonly id: number;
  private readonly name: string;
  private readonly email: string;
  private readonly password: string;

  constructor(data: UserData) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }
}
