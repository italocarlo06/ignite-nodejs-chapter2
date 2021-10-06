import { Request, Response } from "express";
import { container } from "tsyringe";
import { ProfileUserUseCase } from "./ProfileUserUseCase";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

class ProfileUserController {
  async handle(request: Request, response: Response): Promise<Response>{
    const { id } = request.user;

    const userProfileUseCase = container.resolve(ProfileUserUseCase);

    const user = await userProfileUseCase.execute(id);
    

    return response.json(user);
  }
}

export { ProfileUserController }