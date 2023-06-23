import { CacheRepository } from "../../repositories/CacheRepository";
import { MySqlUserRepository } from "../../repositories/MySqlUserRepository";
import { LoginUseCase } from "./loginUseCase";

const cacheRepository = new CacheRepository();

//Repo
const userRepository = new MySqlUserRepository(cacheRepository);

//Inicializa o useCase
const loginUseCase = new LoginUseCase(userRepository);

export { loginUseCase };
