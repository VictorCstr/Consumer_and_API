import { ICreateUserDTO } from "./createUserDTO";
import { User } from "../../entities/User";
import { IUserRepository } from "../../interfaces/IUserRepository";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: ICreateUserDTO): Promise<Boolean> {
    const { id, username, name, email, password, birthdate } = data;

    const newUser = new User({
      id,
      username,
      email,
      name,
      password,
      birthdate,
      status: "Active",
    });

    await this.userRepository.create(newUser);

    return true;
  }
}
