import { CacheRepository } from "../../repositories/CacheRepository";
import { MySqlUserRepository } from "../../repositories/MySqlUserRepository";
import { CreateUserUseCase } from "./createUserUseCase";

const cacheRepository = new CacheRepository();

const userRepository = new MySqlUserRepository(cacheRepository);

const createUserUseCase = new CreateUserUseCase(
  userRepository,
  cacheRepository
);

export { createUserUseCase };
