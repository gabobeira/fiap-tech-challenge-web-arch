export interface AuthModel {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface AuthTokenModel {
  id: number;
  email: string;
  token: string;
  expirationTime: number;
  timestampLogin: number;
  timestampNewExpiration: number;
}

export class AuthData {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly password: string;

  constructor(data: AuthModel) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
  }
}
