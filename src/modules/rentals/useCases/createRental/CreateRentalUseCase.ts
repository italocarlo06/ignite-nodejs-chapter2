import { inject, injectable } from "tsyringe";

import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { CreateRentalDTO } from "@modules/rentals/dtos/CreateRentalDTO";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

import { AppError } from "@shared/errors/AppError";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";


@injectable()
class CreateRentalUseCase{

  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ){
    
  }
  async execute({ car_id, user_id, expected_return_date}: CreateRentalDTO): Promise<Rental>{
    const existRentalOpenByCar = await this.rentalsRepository.findOpenedByCar(car_id);

    if (existRentalOpenByCar){
      throw new AppError("A rental is opened by this car!");
    }

    const existRentalOpenByUser = await this.rentalsRepository.findOpenedByUser(user_id);

    if (existRentalOpenByUser){
      throw new AppError("A rental is opened by this user!");
    }
      
    const compare = this.dateProvider.compareInHours(new Date(), expected_return_date);

    if (compare < 24) {
      throw new AppError(`Invalid return time!`);
    }

    const rental = await this.rentalsRepository.create({
      car_id, 
      user_id, 
      expected_return_date
    });

    await this.carsRepository.updateCarAvailable({ car_id , available: false});
    

    return rental;
  }
}

export { CreateRentalUseCase }