import { MySqlUserRepository } from "../../repositories/MySqlUserRepository";
import { CreateUserUseCase } from "./createUserUseCase";

const userRepository = new MySqlUserRepository();

const createUserUseCase = new CreateUserUseCase(userRepository);

export { createUserUseCase };
