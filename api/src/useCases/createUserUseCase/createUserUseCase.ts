import { ICreateUserDTO } from "./createUserDTO";
import { Status, User } from "../../entities/User";
import { IUserRepository } from "../../interfaces/IUserRepository";
import { ApiError } from "../../errors";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository, private queueProvider) {}

  async execute(data: ICreateUserDTO): Promise<Boolean> {
    const { username, name, password, birthdate } = data;

    if (!name || !password || !username || !birthdate) {
      throw new ApiError(400, "Dados não informados pelo cliente");
    }

    const existUser = await this.userRepository.existUser(username);

    if (existUser == true) {
      const correctPassword = await this.userRepository.verify(
        username,
        password
      );

      if (correctPassword) {
        await this.queueProvider.getInstance().publish({
          exchange: "event-create",
          routingKey: "create-user.update",
          content: data,
        });
      } else {
        throw new ApiError(
          403,
          "Usuário já cadastrado, mas a senha não condiz"
        );
      }
    }

    const newUser = new User({
      username,
      name,
      password,
      birthdate,
      status: "Active",
    });

    await this.queueProvider.getInstance().publish({
      exchange: "event-create",
      routingKey: "create-user.createUser",
      content: data,
    });

    return true;
  }
}
