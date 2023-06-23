import { User } from "../entities/User";
import { IUserRepository } from "../interfaces/IUserRepository";
import { ApiError } from "../errors";

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
    {
      id: "3",
      username: "usuario1",
      email: "emailteste_12345@hotmail.com",
      name: "Usuario novo 2",
      password:
        "$2b$10$UKlKQ.d4Nz / gYl / qlxTC8uQE3L4jPYvLBXzQmS8ciLzB9AGqJ.y3G",
      status: "Cancelled",
      birthdate: new Date("25-12-2000"),
    },
  ];

  async alreadyCanceled(username: string): Promise<Boolean> {
    const user = this.users.find((user) => user.username == username);
    return user.status == "Cancelled" ? true : false;
  }

  async cancel(username: string): Promise<Boolean> {
    const user = this.users.find((user) => user.username == username);
    user.status = "Cancelled";
    return true;
  }

  async create(user: User): Promise<Boolean> {
    this.users.push(user);
    return true;
  }

  async update(user: User): Promise<Boolean> {
    let userToUpdate = this.users.find(
      (userOnArray) => userOnArray.username == user.username
    );

    userToUpdate = user;
    return true;
  }
}
