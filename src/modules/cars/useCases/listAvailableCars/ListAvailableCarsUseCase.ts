import "reflect-metadata";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { injectable, inject } from "tsyringe";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ListCarsDTO } from "@modules/cars/dtos/ListCarsDTO";

@injectable()
class ListAvailableCarsUseCase {


  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ){

  }

  async execute({ name, brand, category_id }: ListCarsDTO):Promise<Car[]>{
    const cars = await this.carsRepository.findAvailable({ name, brand, category_id });
    return cars;
  }
}

export { ListAvailableCarsUseCase }