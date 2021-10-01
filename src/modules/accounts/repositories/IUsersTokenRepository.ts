import { CreateUserTokenDTO } from "../dtos/CreateUserTokenDTO";
import { UserToken } from "../infra/typeorm/entities/UserToken";

interface IUsersTokensRepository {

  create({ user_id, refresh_token, expires_date }: CreateUserTokenDTO):Promise<UserToken>;
  findByToken(refresh_token: string): Promise<UserToken>;
  findByUser(user_id: string): Promise<UserToken[]>;
  deleteById(id: string):Promise<void>;
}

export { IUsersTokensRepository }