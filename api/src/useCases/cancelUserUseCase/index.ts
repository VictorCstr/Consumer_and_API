import { QueueRabbitProvider } from "../../providers/QueueRabbitProvider";
import { MySqlUserRepository } from "../../repositories/MySqlUserRepository";
import { CancelUserUseCase } from "./cancelUserUseCase";

const userRepository = new MySqlUserRepository();

const queueProvider = new QueueRabbitProvider();

//Inicializa o useCase
const cancelUserUseCase = new CancelUserUseCase(userRepository, queueProvider);

export { cancelUserUseCase };
