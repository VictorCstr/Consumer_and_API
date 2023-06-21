import { ICreateUserDTO } from "./createUserDTO";
import { Status, User } from "../../entities/User";
import { IUserRepository } from "../../interfaces/IUserRepository";
import { ApiError } from "../../errors";
import { QueueRabbitProvider } from "../../providers/QueueRabbitProvider";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: ICreateUserDTO): Promise<User> {
    const { username, name, email, password, birthdate } = data;

    const newUser = new User({
      username,
      email,
      name,
      password,
      birthdate: new Date(birthdate),
      status: "Active",
    });

    return await this.userRepository.create(newUser);
  }
}
