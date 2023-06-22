import { MySqlUserRepository } from "../../repositories/MySqlUserRepository";
import { CancelUserUseCase } from "./cancelUserUseCase";

const userRepository = new MySqlUserRepository();

const cancelUserUseCase = new CancelUserUseCase(userRepository);

export { cancelUserUseCase };
