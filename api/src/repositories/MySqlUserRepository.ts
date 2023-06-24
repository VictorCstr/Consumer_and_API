import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../interfaces/IUserRepository";
import { ApiError } from "../errors";
import bcrypt from "bcrypt";
import { Login } from "../entities/Login";
import { ICacheRepository } from "../interfaces/ICacheRepository";
import logger from "../utils/logger";

const prisma = new PrismaClient();

export class MySqlUserRepository implements IUserRepository {
  constructor(private cache: ICacheRepository) {}
  async existUser(username: string): Promise<Boolean> {
    try {
      const existInCache = await this.cache.get(username);

      if (existInCache != null) return true;

      const user: [] =
        await prisma.$queryRaw` SELECT name FROM user WHERE username = ${username}`;

      return user.length > 0 ? true : false;
    } catch (error) {
      logger.error(error);
      throw new ApiError(400, error);
    }
  }

  async verify(username: string, password: string): Promise<Boolean> {
    try {
      const user =
        await prisma.$queryRaw` SELECT password FROM user WHERE username = ${username}`;

      if (await !bcrypt.compareSync(password, user[0].password)) {
        return false;
      }

      return true;
    } catch (error) {
      logger.error(error);
      throw new ApiError(400, error);
    }
  }

  async getUser(username: string): Promise<Login> {
    try {
      const user: Login =
        await prisma.$queryRaw` SELECT id, username FROM user WHERE username = ${username}`;

      return {
        id: user[0]?.id,
        username: user[0]?.username,
      };
    } catch (error) {
      logger.error(error);
      throw new ApiError(400, error);
    }
  }
}
