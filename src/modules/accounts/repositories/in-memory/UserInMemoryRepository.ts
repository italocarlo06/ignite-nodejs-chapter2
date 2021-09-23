import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CreateUserDTO } from "@modules/accounts/dtos/CreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

class UsersInMemoryRepository implements IUsersRepository{
  private users: User[] = [];

  async create({ name, email, driver_license, password }: CreateUserDTO): Promise<void> {    

    const user = new User();
    Object.assign(user, {
      name,
      email,
      driver_license,
      password
    });    
    this.users.push(user);    
  }
  async findByName(name: string): Promise<User> {
    const user = this.users.find( user => user.name === name);
    return user;
  }

  async list(): Promise<User[]> {
    const users = this.users;

    return users;
  }
  
  async findByEmail(email: string): Promise<User> {
    const user = this.users.find( user => user.email === email);
    return user;
  }
  async findById(id: string): Promise<User> {
    const user = this.users.find( user => user.id === id);
    return user;
  }  
  
}

export { UsersInMemoryRepository }