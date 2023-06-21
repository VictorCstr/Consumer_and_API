import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../interfaces/IUserRepository";
import { User } from "../entities/User";
import { ApiError } from "../errors";

const prisma = new PrismaClient();

export class MySqlUserRepository implements IUserRepository {
  constructor() {}

  async cancel(username: string): Promise<Boolean> {
    try {
      throw new ApiError(400, "Not implemented");

      // const userCreate =
      //   await prisma.$queryRaw` INSERT into user VALUES (${id} ,${username} ,${email} ,${name} ,${password} ,${status} ,${birthdate} )`;

      // return true;
    } catch (error) {
      console.log(error);
      throw new ApiError(400, error);
    }
  }

  async create(user: User): Promise<Boolean> {
    try {
      const { id, username, email, name, password, status, birthdate } = user;

      const result = await prisma.$executeRaw`
        INSERT INTO user (id, username, name, password,status, birthdate, email)
        VALUES (${id}, ${username}, ${name}, ${password}, ${status}, ${birthdate}, ${email} );`;

      if (result < 1) {
        return false;
      }

      return true;
    } catch (error) {
      console.log(error);
      throw new ApiError(400, error);
    }
  }

  async update(user: User): Promise<User> {
    const { id, username, email, name, password, status, birthdate } = user;

    try {
      throw new ApiError(400, "Not implemented");
      // const userUpdate =
      //   await prisma.$queryRaw` UPDATE user SET= (${id} ,${username} ,${email} ,${name} ,${password} ,${status} ,${birthdate} )`;

      // return userUpdate;
    } catch (error) {
      console.log(error);
      throw new ApiError(400, error);
    }
  }

  async existUser(username: string): Promise<Boolean> {
    try {
      const user: [] =
        await prisma.$queryRaw` SELECT name FROM user WHERE username = ${username}`;

      return user.length > 0 ? true : false;
    } catch (error) {
      console.log(error);
      throw new ApiError(400, error);
    }
  }
}
