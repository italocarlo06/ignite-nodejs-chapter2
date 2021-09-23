import { inject, injectable } from "tsyringe";

import { CreateCarSpecificationDTO } from "@modules/cars/dtos/CreateCarSpecificationDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

@injectable()
class CreateCarSpecificationUseCase{

  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository,
  ){

  }

  async execute({ car_id, specifications_id }: CreateCarSpecificationDTO ):Promise<Car>{
    const carExists = await this.carsRepository.findById(car_id);    

    if (!carExists){
      throw new AppError("Car does not exists!");
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id
    );

    carExists.specifications = specifications;

    await this.carsRepository.create(carExists);

    return carExists;
  }
}

export { CreateCarSpecificationUseCase };
