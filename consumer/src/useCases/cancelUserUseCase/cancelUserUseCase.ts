import { ICancelUserDTO } from "./cancelUserDTO";
import { User } from "../../entities/User";
import { IUserRepository } from "../../interfaces/IUserRepository";

export class CancelUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: ICancelUserDTO): Promise<Boolean> {
    const { username } = data;

    const update = await this.userRepository.cancel(username);

    return true;
  }
}
