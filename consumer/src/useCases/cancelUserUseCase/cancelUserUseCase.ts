import { ICancelUserDTO } from "./cancelUserDTO";
import { User } from "../../entities/User";
import { IUserRepository } from "../../interfaces/IUserRepository";
import { ApiError } from "../../errors";

export class CancelUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: ICancelUserDTO): Promise<Boolean> {
    const { username } = data;

    const canceled = await this.userRepository.alreadyCanceled(username);

    if (canceled == true) {
      throw new ApiError(400, "Already Cancelled");
    }

    if (canceled == false) {
      const update = await this.userRepository.cancel(username);
    }

    return true;
  }
}
