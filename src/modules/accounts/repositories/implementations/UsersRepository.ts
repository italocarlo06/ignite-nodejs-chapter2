import { Repository, getRepository } from "typeorm";

import { User } from "../../entities/User";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { IUsersRepository } from "../IUsersRepository";


class UsersRepository implements IUsersRepository{
  
  private repository: Repository<User>;

  constructor () {
    this.repository = getRepository(User);
  }
  

  async create({ name, email, password, driver_license, avatar, id }: CreateUserDTO):Promise<void>{
    const user = this.repository.create({      
      name,
      email,
      password,
      driver_license,
      avatar,
      id
    });
    
    await this.repository.save(user);
  }

  async list():Promise<User[]>{
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name:string):Promise<User>{    
    const user = await this.repository.findOne({
      where:{
        name
      }
    })
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({
      where:{
        email
      }
    })
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }

}

export { UsersRepository };