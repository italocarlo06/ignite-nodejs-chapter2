import { IUsersTokensRepository } from "../IUsersTokenRepository";
import { CreateUserTokenDTO } from "@modules/accounts/dtos/CreateUserTokenDTO";
import { UserToken } from "@modules/accounts/infra/typeorm/entities/UserToken";


class UsersTokensInMemoryRepository implements IUsersTokensRepository {
  
  private usersToken: UserToken[] = [];
  
  async create({ 
    user_id, 
    refresh_token, 
    expires_date }: CreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();
    Object.assign(userToken, {
      user_id,
      refresh_token,
      expires_date
    });
    
    this.usersToken.push(userToken);

    return userToken;
  }

  async findByToken(refresh_token: string): Promise<UserToken> {
    const userToken = this.usersToken.find( userToken => userToken.refresh_token === refresh_token );
    return userToken;
  }

  async findByUser(user_id: string): Promise<UserToken[]> {
    const userToken = this.usersToken.filter( userToken => userToken.user_id === user_id );
    return userToken;
  }

  deleteById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }


}