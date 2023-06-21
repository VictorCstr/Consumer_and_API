import { MySqlUserRepository } from "../../repositories/MySqlUserRepository";
import { UpdateUserUseCase } from "./updateUserUseCase";

const userRepository = new MySqlUserRepository();

const updateUserUseCase = new UpdateUserUseCase(userRepository);

export { updateUserUseCase };
