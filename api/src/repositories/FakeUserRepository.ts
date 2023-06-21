import { User } from "../entities/User";
import { IUserRepository } from "../interfaces/IUserRepository";
import bcrypt from "bcrypt";
import { ApiError } from "../errors";
import { Login } from "../entities/Login";

export class FakeUserRepository implements IUserRepository {
  private users: User[] = [
    {
      id: "1",
      username: "usuario123",
      email: "emailteste_123@hotmail.com",
      name: "Usuario novo 1",
      password: "$2b$10$UKlKQ.d4Nz/gYl/qlxTC8uQE3L4jPYvLBXzQmS8ciLzB9AGqJ.y3G",
      status: "Active",
      birthdate: new Date("25-12-1999"),
    },
    {
      id: "2",
      username: "usuario234",
      email: "emailteste_12345@hotmail.com",
      name: "Usuario novo 2",
      password:
        "$2b$10$UKlKQ.d4Nz / gYl / qlxTC8uQE3L4jPYvLBXzQmS8ciLzB9AGqJ.y3G",
      status: "Active",
      birthdate: new Date("25-12-2000"),
    },
  ];

  async getUser(username: string): Promise<Login> {
    const user = this.users.find((user) => user.username == username);
    return {
      id: user.id,
      username: user.username,
    };
  }

  async verify(username: string, password: string): Promise<Boolean> {
    const user = this.users.find((user) => user.username == username);

    if (!user) {
      throw new ApiError(400, "Usuário não está cadastrado!");
    }

    if (await !bcrypt.compareSync(password, user.password)) {
      return false;
    }

    return true;
  }

  async existUser(username: string): Promise<Boolean> {
    const userExist = this.users.find((user) => user.username == username);

    return userExist == undefined ? false : true;
  }
}
