import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { User } from "../entities/User";

interface IUsersRepository {
    create({ name, password, driver_license, email }: CreateUserDTO):Promise<void>;
    findByName(name:string):Promise<User>;
    findByEmail(email:string):Promise<User>;
    findById(id:string):Promise<User>;
    list():Promise<User[]>;

}

export { IUsersRepository }