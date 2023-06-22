import { ICreateUserDTO } from "./updateUserDTO";
import { User } from "../../entities/User";
import { IUserRepository } from "../../interfaces/IUserRepository";

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: ICreateUserDTO): Promise<Boolean> {
    const { id, username, name, email, password, birthdate } = data;

    const userToUpdate = new User({
      username,
      email,
      name,
      password,
      birthdate,
    });

    const update = await this.userRepository.update(userToUpdate);

    return true;
  }
}
