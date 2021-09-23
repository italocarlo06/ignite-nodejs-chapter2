import { injectable, inject } from "tsyringe";

import { CreateCarDTO } from "@modules/cars/dtos/CreateCarDTO"
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@errors/AppError";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

@injectable()
class CreateCarUseCase{

  constructor(
    @inject("CarsRepository") 
    private carsRepository: ICarsRepository
  ){

  }
  async execute({ 
    name, 
    description, 
    fine_amount, 
    license_plate, 
    category_id, 
    brand, 
    daily_rate 
  }: CreateCarDTO): Promise<Car>{

    const alreadyCarExist = await this.carsRepository.findByLicensePlate(license_plate);
    if (alreadyCarExist){
      throw new AppError("Car already exists!");
    }

    const car = await this.carsRepository.create({
      name, 
      description, 
      fine_amount, 
      license_plate, 
      category_id, 
      brand, 
      daily_rate 
    });

    return car;
  }

}

export { CreateCarUseCase }