import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { User } from "@modules/accounts/infra/typeorm/entities/User";


@injectable()
class ListUsersUseCase {

  constructor ( 
    @inject('UsersRepository')
    private usersRepository: IUsersRepository){

  }
  async execute():Promise<User[]> {    
    return await this.usersRepository.list();          
  }
}

export { ListUsersUseCase }