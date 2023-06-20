import { User } from "../entities/User";

export interface IUserRepository {
  verify(username: string, password: string): Promise<Boolean>;
  cancel(username: string): Promise<Boolean>;
  existUser(username: string): Promise<Boolean>;
}
