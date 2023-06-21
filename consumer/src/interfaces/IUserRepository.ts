import { Status, User } from "../entities/User";

export interface IUserRepository {
  create(user: User): Promise<Boolean>;
  update(user: User): Promise<User>;
  cancel(username: string): Promise<Boolean>;
  existUser(username: string): Promise<Boolean>;
}
