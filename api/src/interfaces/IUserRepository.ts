import { Status, User } from "../entities/User";

export interface IUserRepository {
  existUser(username: string): Promise<Boolean>;
}
