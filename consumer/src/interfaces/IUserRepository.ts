import { Status, User } from "../entities/User";

export interface IUserRepository {
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  cancel(username: string): Promise<Boolean>;
  existUser(username: string): Promise<Boolean>;
}
