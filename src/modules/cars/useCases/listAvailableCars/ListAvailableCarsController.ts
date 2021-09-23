import { Request, Response } from "express";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";
import { container } from "tsyringe";

class ListAvailableCarsController {


  
  async handle(request: Request, response: Response):Promise<Response> {    
    const { brand, name, category_id } = request.body;
    const listAvailableCarsUseCase = container.resolve(ListAvailableCarsUseCase)
    const categories = await listAvailableCarsUseCase.execute({
      brand,
      name,
      category_id
    });

    
    return response.json(categories);  
  }
}

export { ListAvailableCarsController };