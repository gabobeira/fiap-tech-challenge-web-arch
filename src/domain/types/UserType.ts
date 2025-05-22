export type UserData = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type UserLoginParams = Omit<UserData, "id" | "name">;

export type UserRegisterParams = Omit<UserData, "id">;

export type UserToken = {
  id: number;
  email: string;
  token: string;
  expirationTime: number;
  timestampLogin: number;
  timestampNewExpiration: number;
};
