import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../interfaces/IUserRepository";
import { User } from "../entities/User";
import { ApiError } from "../errors";
import bcrypt from "bcrypt";
import fastify from "fastify";
import { signToken } from "../utils/fastifyJWT";
import { Login } from "../entities/Login";

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

  async verify(username: string, password: string): Promise<Boolean> {
    try {
      const user =
        await prisma.$queryRaw` SELECT password FROM user WHERE username = ${username}`;

      if (await !bcrypt.compareSync(password, user[0].password)) {
        throw new ApiError(401, "Não autorizado!");
      }

      return true;
    } catch (error) {
      console.log(error);
      throw new ApiError(400, error);
    }
  }

  async getUser(username: string): Promise<Login> {
    try {
      const user: Login =
        await prisma.$queryRaw` SELECT id, username FROM user WHERE username = ${username}`;

      return {
        id: user[0].id,
        username: user[0].username,
      };
    } catch (error) {
      throw new ApiError(400, error);
    }
  }
}
