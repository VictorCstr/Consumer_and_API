import { Login } from "../entities/Login";
import { Status, User } from "../entities/User";

export interface IUserRepository {
  existUser(username: string): Promise<Boolean>;
  verify(username: string, password: string): Promise<Boolean>;
  getUser(username: string): Promise<Login>;
}
