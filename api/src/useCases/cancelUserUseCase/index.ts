import { CacheRepository } from "../../repositories/CacheRepository";
import { MySqlUserRepository } from "../../repositories/MySqlUserRepository";
import { CancelUserUseCase } from "./cancelUserUseCase";

const cacheRepository = new CacheRepository();

const userRepository = new MySqlUserRepository(cacheRepository);

//Inicializa o useCase
const cancelUserUseCase = new CancelUserUseCase(userRepository);

export { cancelUserUseCase };
