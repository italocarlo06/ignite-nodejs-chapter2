import { injectable, inject } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { UserResponseDTO } from "@modules/accounts/dtos/UserResponseDTO";
import { UserMap } from "@modules/accounts/mapper/UserMap";

@injectable()
class ProfileUserUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ){

  }
  async execute(user_id: string):Promise<UserResponseDTO>{
    const user = await this.usersRepository.findById(user_id);
    
    if (!user){
      throw new AppError("User not found!");
    }


    return UserMap.toDTO(user);
  }
}

export { ProfileUserUseCase }