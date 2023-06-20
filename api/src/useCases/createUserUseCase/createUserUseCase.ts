import { ICreateUserDTO } from "./createUserDTO";
import { Status, User } from "../../entities/User";
import { IUserRepository } from "../../interfaces/IUserRepository";
import { ApiError } from "../../errors";
import { QueueRabbitProvider } from "../../providers/QueueRabbitProvider";

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private queueProvider: QueueRabbitProvider
  ) {}

  async execute(data: ICreateUserDTO): Promise<Boolean> {
    const { username, name, email, password, birthdate } = data;

    const existUser = await this.userRepository.existUser(username);

    if (existUser == true) {
      throw new ApiError(400, "Nome de usuário já existente!");
    }

    const newUser = new User({
      username,
      email,
      name,
      password,
      birthdate,
      status: "Active",
    });

    QueueRabbitProvider.getInstance().publish({
      exchange: "event-create",
      content: newUser,
    });

    return true;
  }
}
