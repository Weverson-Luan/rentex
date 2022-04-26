import { inject, injectable } from "tsyringe";
import { User } from "@modules/accounts/infra/typeorm/entity/User";
import { IUsersRepository } from "@modules/accounts/repositories/interface/IUsersRepository";
import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { UserMap } from "@modules/accounts/mapper/UserMap";


@injectable()
class ProfileUserUseCase{
  constructor(
    @inject("UserRepository")
    private userRepository : IUsersRepository,
  ){}
  async execute(user_id: string): Promise<IUserResponseDTO>{

    const user = await this.userRepository.findById(user_id);

    return UserMap.toDTO(user);
  }
};

export { ProfileUserUseCase };