import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";

import { CreateUserDTO } from "@modules/accounts/dtos/CreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor ( 
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ){

  }
  async execute({ name, email, password, driver_license }: CreateUserDTO):Promise<void> {
    const hashedPassword = await hash(password, 8);
    const userAlreadExists = await this.usersRepository.findByEmail(email);
    if (!userAlreadExists){
      await this.usersRepository.create({ 
        name, 
        email, 
        password: hashedPassword, 
        driver_license 
      });      
    }
    else 
      throw new AppError("User already exists");
  }
}

export { CreateUserUseCase }