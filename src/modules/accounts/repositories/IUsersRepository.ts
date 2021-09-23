import { CreateUserDTO } from "@modules/accounts/dtos/CreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

interface IUsersRepository {
    create({ name, password, driver_license, email }: CreateUserDTO):Promise<void>;
    findByName(name:string):Promise<User>;
    findByEmail(email:string):Promise<User>;
    findById(id:string):Promise<User>;
    list():Promise<User[]>;

}

export { IUsersRepository }