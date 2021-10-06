import { classToClass } from "class-transformer";

import { User } from "../infra/typeorm/entities/User";
import { UserResponseDTO } from "../dtos/UserResponseDTO";


class UserMap {

  static toDTO({
    id, 
    isAdmin, 
    driver_license,    
    name, 
    email, 
    avatar,
    avatar_url
  }: User): UserResponseDTO{

    const user = classToClass({
      id, 
      isAdmin, 
      driver_license,    
      name, 
      email, 
      avatar,
      avatar_url
    });
    return user;
  }
}

export { UserMap }