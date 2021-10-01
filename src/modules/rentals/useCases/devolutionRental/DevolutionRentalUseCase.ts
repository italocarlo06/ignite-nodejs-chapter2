import { injectable, inject } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider,
  ){

  }
  async execute({ id, user_id }: DevolutionRentalDTO): Promise<Rental>{
    const rental = await this.rentalsRepository.findById(id);
    const minimumDaily = 1;
    
    if (!rental){
      throw new AppError("Rental not found!");
    }
    
    const car = await this.carsRepository.findById(rental.car_id);

    if (!car){
      throw new AppError("Car not found!");
    }

    rental.end_date = this.dateProvider.dateNow();

    let rentalDays = this.dateProvider.compareInDays(rental.start_date, rental.end_date);
    
    if (rentalDays < minimumDaily) {
      rentalDays = minimumDaily;
    }
    console.log(rentalDays);

    rental.total = rentalDays * car.daily_rate;

    const delayed = this.dateProvider.compareInDays(rental.expected_return_date, rental.end_date );
    console.log(rental.total);
    console.log(delayed);
    if (delayed > 0 ){
      rental.total += car.fine_amount * delayed;
    }

    console.log(rental.total);
    

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateCarAvailable({
      car_id: car.id as string,
      available: true
    });

    return rental;
  }
}

export { DevolutionRentalUseCase };