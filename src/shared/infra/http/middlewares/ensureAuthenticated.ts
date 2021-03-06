import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@errors/AppError";

import auth from "@config/auth";

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
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload ;

    const usersRepository = new UsersRepository();    
    const user = await usersRepository.findById(user_id);    

    if (!user){
      throw new AppError("User does not exists!");
    }
        
    request.user = {
      id: user_id,
      isAdmin: user.isAdmin
    }
    next();
  } catch (error) {
    throw new AppError("Invalid Token!",401);
  }
}
