import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../interfaces/IUserRepository";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import { ApiError } from "../errors";

const prisma = new PrismaClient();

export class MySqlUserRepository implements IUserRepository {
  constructor() {}

  async existUser(username: string): Promise<Boolean> {
    try {
      throw new Error("Method not implemented yet");
    } catch (error) {
      console.log(error);
      throw new ApiError(400, error);
    }
  }

  async verify(username: string, password: string): Promise<Boolean> {
    try {
      throw new Error("Method not implemented yet");
    } catch (error) {
      console.log(error);
      throw new ApiError(400, error);
    }
  }

  async cancel(username: string): Promise<Boolean> {
    try {
      throw new Error("Method not implemented yet");
    } catch (err) {
      throw new Error("Method not implemented yet");
    }
  }
}
