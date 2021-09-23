import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarUseCase } from "./CreateCarUseCase";

class CreateCarController {  
  
  async handle(request: Request, response: Response):Promise<Response> {
    const { 
      name, 
      description, 
      fine_amount, 
      license_plate, 
      category_id, 
      brand, 
      daily_rate  
    } = request.body;  
    const createCategoryUseCase = container.resolve(CreateCarUseCase);
      
    const car = await createCategoryUseCase.execute({
      name, 
      description, 
      fine_amount, 
      license_plate, 
      category_id, 
      brand, 
      daily_rate 
    });
    return response.status(201).json(car);            
  }
}

export { CreateCarController };