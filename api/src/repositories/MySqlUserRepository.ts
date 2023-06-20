import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../interfaces/IUserRepository";
import { User } from "../entities/User";
import { ApiError } from "../errors";

const prisma = new PrismaClient();

export class MySqlUserRepository implements IUserRepository {
  constructor() {}

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
