import { IRentalsRepository } from "../IRentalsRepository";
import { CreateRentalDTO } from "@modules/rentals/dtos/CreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

class RentalsInMemoryRepository implements IRentalsRepository {

  private rentals: Rental[] = [];
  
  async create({ user_id, car_id, expected_return_date, id, end_date, total }: CreateRentalDTO): Promise<Rental> {
    const rental = new Rental();
    Object.assign(rental, {
      user_id,
      car_id,
      expected_return_date,
      start_date: new Date(),      
      id,
      end_date,
      total
    });
    this.rentals.push(rental);

    return rental;
  }

  async findOpenedByUser(user_id: string): Promise<Rental> {
    const car = this.rentals.find( rental => rental.user_id === user_id && !rental.end_date);
    return car;
  }
  
  async findOpenedByCar(car_id: string): Promise<Rental> {
    const car = this.rentals.find( rental => rental.car_id === car_id && !rental.end_date);
    return car;
  }

  async findById(id: string): Promise<Rental> {
    const rental = this.rentals.find( rental => rental.id === id);
    return rental;
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    const rentals = this.rentals.filter( rental => rental.user_id === user_id);
    return rentals;
  }


}

export { RentalsInMemoryRepository };