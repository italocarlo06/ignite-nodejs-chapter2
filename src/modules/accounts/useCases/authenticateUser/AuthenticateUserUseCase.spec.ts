import { UsersInMemoryRepository } from "@modules/accounts/repositories/in-memory/UserInMemoryRepository";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AppError } from "@errors/AppError";

let usersRepository: UsersInMemoryRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
describe("Authenticate User Use Case Tests", () => {
  
  beforeEach(() =>{
    usersRepository = new UsersInMemoryRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it("should be able to authenticate a user with email and password correct", async () => {
    const user = {
      name: "italo",
      email: "italocarlo06@gmail.com",
      password: "123456",
      driver_license: "1245"
    }
    
    await createUserUseCase.execute(user);
    
    const response = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });

    expect(response).toHaveProperty("token");
  });

  it("should not be able to authenticate a user with incorrect password", async () => {
    const user = {
      name: "italo",
      email: "italocarlo06@gmail.com",
      password: "123456",
      driver_license: "1245"
    }
    
    await createUserUseCase.execute(user);

    await expect(         
      authenticateUserUseCase.execute({
        email: user.email,
        password: "123"
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));    
  });

  it("should not be able to authenticate a user with incorrect email", async () => {
    const user = {
      name: "italo",
      email: "italocarlo06@gmail.com",
      password: "123456",
      driver_license: "1245"
    }
    
    await createUserUseCase.execute(user);

    await expect(         
      authenticateUserUseCase.execute({
        email: "user@gmail.com",
        password: user.password
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));     
  });

});