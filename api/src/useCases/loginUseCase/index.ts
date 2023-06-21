import { MySqlUserRepository } from "../../repositories/MySqlUserRepository";
import { LoginUseCase } from "./loginUseCase";

//Repo
const userRepository = new MySqlUserRepository();

//Inicializa o useCase
const loginUseCase = new LoginUseCase(userRepository);

export { loginUseCase };
