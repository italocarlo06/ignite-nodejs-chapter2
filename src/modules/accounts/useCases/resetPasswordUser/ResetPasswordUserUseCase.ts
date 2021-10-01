import { injectable, inject } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

@injectable()
class ResetPasswordUserUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ){

  }
  async execute ({ token, password }: ResetPasswordDTO): Promise<void>{
    const userToken = await this.usersTokensRepository.findByToken(token);

    if (!userToken){
      throw new AppError("Token is not found!");
    }

    if (this.dateProvider.compareIfBefore(
      userToken.expires_date, 
      this.dateProvider.dateNow()
      )){
      throw new AppError("Token expired");
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user){
      throw new AppError("User is not found!");
    }

    const hashedPassword = await hash(password, 8);

    user.password = hashedPassword;

    await this.usersRepository.create(user);
    
    await this.usersTokensRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUserUseCase }