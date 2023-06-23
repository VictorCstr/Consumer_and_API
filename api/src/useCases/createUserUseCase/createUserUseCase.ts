import { ICreateUserDTO } from "./createUserDTO";
import { Status, User } from "../../entities/User";
import { IUserRepository } from "../../interfaces/IUserRepository";
import { ApiError } from "../../errors";
import { QueueRabbitProvider } from "../../providers/QueueRabbitProvider";
import { hashPassword } from "../../utils/encrypt";
import { ICacheRepository } from "../../interfaces/ICacheRepository";

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private cache: ICacheRepository
  ) {}

  async execute(data: ICreateUserDTO): Promise<Boolean> {
    const { username, name, email, password, birthdate } = data;

    const hashPass = await hashPassword(password);

    const newUser = new User({
      username,
      email,
      name,
      password: hashPass,
      birthdate,
      status: "Active",
    });

    QueueRabbitProvider.getInstance().publish({
      exchange: "event-create",
      content: newUser,
    });

    await this.cache.set(username, "");

    return true;
  }
}
