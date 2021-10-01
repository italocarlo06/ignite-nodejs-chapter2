import { Request, Response } from "express";
import { container } from "tsyringe";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

class RefreshTokenController{

  async handle(request: Request, response: Response):Promise<Response>{
    let refresh_token = 
      request.body.token || 
      request.headers["x-access-token"] || 
      request.query.token;
    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);
    refresh_token = await refreshTokenUseCase.execute(refresh_token);

    return response.json({
      refresh_token
    })

  }
}

export { RefreshTokenController }