import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../interfaces/IUserRepository";
import { User } from "../entities/User";
import { ApiError } from "../errors";
import logger from "../utils/logger";

const prisma = new PrismaClient();

export class MySqlUserRepository implements IUserRepository {
  constructor() {}

  static async existUser(username: string): Promise<Boolean> {
    try {
      const user: [] =
        await prisma.$queryRaw` SELECT name FROM user WHERE username = ${username}`;

      return user.length > 0 ? true : false;
    } catch (error) {
      logger.error(error);
      throw new ApiError(400, error);
    }
  }

  async alreadyCanceled(username: string): Promise<Boolean> {
    try {
      const user =
        await prisma.$queryRaw` SELECT status FROM user WHERE username = ${username}`;

      return user[0].status == "Cancelled" ? true : false;
    } catch (error) {
      logger.error(error);
      throw new ApiError(400, error);
    }
  }

  async cancel(username: string): Promise<Boolean> {
    try {
      const result = await prisma.$executeRaw`
        UPDATE user SET status = "Cancelled" where username = ${username} `;

      if (result < 1) {
        return false;
      }

      return true;
    } catch (error) {
      logger.error(error);
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
      logger.error(error);
      throw new ApiError(400, error);
    }
  }

  async update(user: User): Promise<Boolean> {
    const { id, username, email, name, password, status, birthdate } = user;

    try {
      const result = await prisma.$executeRaw`
        UPDATE user SET username =${username}, name =${name}, password =${password},
        birthdate =${birthdate}, email =${email} where username = ${username} `;

      if (result < 1) {
        return false;
      }

      return true;
    } catch (error) {
      logger.error(error);
      throw new ApiError(400, error);
    }
  }
}
