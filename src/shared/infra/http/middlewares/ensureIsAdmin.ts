import { Request, Response, NextFunction } from "express";
import { AppError } from "@errors/AppError";


export async function ensureIsAdmin(request: Request, response: Response, next: NextFunction ){
  const { isAdmin } = request.user;

  if (!isAdmin){
    throw new AppError("User is not admin");
  }      
  next();  
}
