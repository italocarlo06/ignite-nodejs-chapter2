import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";
import { AppError } from "../errors/AppError";

interface IPayload{
  sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction ){
  
  const authHeader = request.headers.authorization;
  
  if (!authHeader){
    throw new AppError("Token is missing!",401);
  }

  const [ , token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token,"31a98b2d2c999faebab50ee41d49f20c") as IPayload ;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user){
      throw new AppError("User does not exists!");
    }
    
    console.log(user_id)
    request.user = {
      id: user_id
    }
    next();
  } catch (error) {
    throw new AppError("Invalid Token!",401);
  }
}
