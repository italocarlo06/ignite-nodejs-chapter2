import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { CreateUserTokenDTO } from "@modules/accounts/dtos/CreateUserTokenDTO";
import { Repository, getRepository } from "typeorm";
import { UserToken } from "../entities/UserToken";

class UsersTokensRepository implements IUsersTokensRepository{
  private repository: Repository<UserToken>;  

  constructor(){
    this.repository = getRepository(UserToken);
  }

  
  async create({ 
    user_id, 
    refresh_token, 
    expires_date 
  }: CreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create({
      user_id,
      refresh_token,
      expires_date
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async findByToken(refresh_token: string): Promise<UserToken> {
    const userToken = await this.repository.findOne({
      where:{
        refresh_token
      }
    });

    return userToken;
  }

  async findByUser(user_id: string): Promise<UserToken[]> {
    const userToken = await this.repository.find({
      where:{
        user_id
      }
    });

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }


}

export { UsersTokensRepository } 