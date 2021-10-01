import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@errors/AppError";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";


interface IRequest{
  email: string;
  password: string;
}

interface IResponse{
  user:{
    name: string,
    email: string
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase{
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokenRepository: IUsersTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ){

  }

  async execute({ email, password }: IRequest): Promise<IResponse>{
    const user = await this.usersRepository.findByEmail(email);
    const { 
      secret_refresh_token, 
      secret_token, 
      expires_in_token,
      expires_in_refresh_token,
      expires_refresh_token_days
    } = auth;

    if (!user){
      throw new AppError("Email or password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    }

    const token = sign({}, secret_token,{
      subject: user.id,
      expiresIn: expires_in_token
    });

    const refresh_token = sign({ email }, secret_refresh_token,{
      subject: user.id,
      expiresIn: expires_in_refresh_token
    });

    const expires_date = this.dateProvider.addDays(expires_refresh_token_days);

    await this.usersTokenRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date 
    });

    return {
      user:{
        email: user.email,
        name: user.name
      },
      token,
      refresh_token
    }

  }
}

export { AuthenticateUserUseCase }