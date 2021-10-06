import { injectable, inject } from "tsyringe";
import { verify, sign } from "jsonwebtoken";

import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokenRepository";

import auth from "@config/auth";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IPayLoad{
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ){
    
  }
  async execute(token: string): Promise<ITokenResponse>{
    const { 
      expires_refresh_token_days, 
      secret_refresh_token,
      expires_in_refresh_token,
      expires_in_token,
      secret_token
    } = auth;
    const { 
      email, 
      sub: user_id
    } = verify(token, auth.secret_refresh_token) as IPayLoad;    

    const userToken = await this.usersTokensRepository.findByToken(token);

    if (!userToken){
      throw new AppError("Refresh token does not exist!");
    }

    if (!(user_id === userToken.user_id)){
      throw new AppError("Invalid user in refresh token!");
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, secret_refresh_token,{
      subject: user_id,
      expiresIn: expires_in_refresh_token
    });

    const newToken = sign({}, secret_token,{
      subject: user_id,
      expiresIn: expires_in_token
    });

    const expires_date = this.dateProvider.addDays(expires_refresh_token_days);

    await this.usersTokensRepository.create({
      user_id,
      refresh_token,
      expires_date 
    });

    return {
      token: newToken,
      refresh_token
    };

  }
}

export { RefreshTokenUseCase }