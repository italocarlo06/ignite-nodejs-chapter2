import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../errors/AppError";

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
}

@injectable()
class AuthenticateUserUseCase{
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ){

  }

  async execute({ email, password }: IRequest): Promise<IResponse>{
    const user = await this.usersRepository.findByEmail(email);

    if (!user){
      throw new AppError("Email or password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    }

    const token = sign({}, "31a98b2d2c999faebab50ee41d49f20c",{
      subject: user.id,
      expiresIn: "1d"
    });

    return {
      user:{
        email: user.email,
        name: user.name
      },
      token
    }

  }
}

export { AuthenticateUserUseCase }