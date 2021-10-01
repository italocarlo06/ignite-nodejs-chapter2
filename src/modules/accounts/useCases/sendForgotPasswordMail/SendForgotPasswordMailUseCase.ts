import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";
import { resolve } from "path";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokenRepository";

import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";


@injectable()
class SendForgotPasswordMailUseCase {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider,
    @inject("MailProvider")
    private mailProvider: IMailProvider,
  ) {

  }

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(
      __dirname,
      "..",      
      "..",
      "views", 
      "email",
      "forgotPassword.hbs"
    );
    if (!user){
      throw new AppError("User not found!");
    }



    const token = uuidv4();

    const expires_date = this.dateProvider.addHours(3);

    const userToken = await this.usersTokensRepository.create({
      user_id: user.id as string,
      refresh_token: token,
      expires_date
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${userToken.refresh_token}`
    }

    await this.mailProvider.sendMail(
      email,
      "Recuperação de Senha", 
      variables,
      templatePath
    );

  }
}

export { SendForgotPasswordMailUseCase };