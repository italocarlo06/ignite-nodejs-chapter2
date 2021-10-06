import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";
import { UsersInMemoryRepository } from "@modules/accounts/repositories/in-memory/UserInMemoryRepository";
import { UsersTokensInMemoryRepository } from "@modules/accounts/repositories/in-memory/UsersTokensInMemoryRepository";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AppError } from "@shared/errors/AppError";

let usersRepository: UsersInMemoryRepository;
let usersTokenRepository: UsersTokensInMemoryRepository;

let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

let sendForgotPasswordMailUseCase:  SendForgotPasswordMailUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Send Forgot Mail", () => {

  beforeEach( async () => {
    usersRepository = new UsersInMemoryRepository();
    usersTokenRepository = new UsersTokensInMemoryRepository();
    
    dateProvider= new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepository,
      usersTokenRepository,
      dateProvider,
      mailProvider
    );

    createUserUseCase= new CreateUserUseCase(usersRepository);

    const user = {
      name: "italo",
      email: "italocarlo06@gmail.com",
      password: "123456",
      driver_license: "1245"
    }
    
    await createUserUseCase.execute(user);
  });

  it("should be able send email", async () => {    
    const sendMail = jest.spyOn(mailProvider,"sendMail");
    await sendForgotPasswordMailUseCase.execute("italocarlo06@gmail.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able send password token reset to a non registered email", async () => {    
    await expect(
      sendForgotPasswordMailUseCase.execute("italocarlo05@gmail.com")
    ).rejects.toEqual(new AppError("User not found!"));
  });

  it("should be able to create an users token", async () => {
    const createUserToken = jest.spyOn(usersTokenRepository,"create");
    await sendForgotPasswordMailUseCase.execute("italocarlo06@gmail.com");

    expect(createUserToken).toHaveBeenCalled();
  });
});