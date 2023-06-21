import { ICancelUserDTO } from "./cancelUserDTO";
import { Status, User } from "../../entities/User";
import { IUserRepository } from "../../interfaces/IUserRepository";
import { ApiError } from "../../errors";
import { QueueRabbitProvider } from "../../providers/QueueRabbitProvider";

export class CancelUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: ICancelUserDTO): Promise<Boolean> {
    const { username, password } = data;

    const existUser = await this.userRepository.existUser(username);

    if (existUser != true) {
      throw new ApiError(404, "Usuário não existente");
    }

    const correctPassword = await this.userRepository.verify(
      username,
      password
    );

    if (correctPassword != true) {
      throw new ApiError(403, "Dados incorretos");
    }

    QueueRabbitProvider.getInstance().publish({
      exchange: "event-cancel",
      content: username,
    });

    return true;
  }
}
