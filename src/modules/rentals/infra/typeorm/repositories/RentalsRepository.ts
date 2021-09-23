import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { CreateRentalDTO } from "@modules/rentals/dtos/CreateRentalDTO";
import { getRepository, IsNull } from "typeorm";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

class RentalsRepository implements IRentalsRepository{
  private repository = getRepository(Rental);

  async create({ user_id, car_id, expected_return_date }: CreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({ 
      user_id, 
      expected_return_date,
      car_id
    });

    await this.repository.save(rental);
    
    return rental;
  }
  
  async findOpenedByUser(user_id: string): Promise<Rental> {
     const rental = await this.repository.findOne({
       where:{
         user_id,
         end_date: IsNull()
       }
     });     
     return rental;
  }

  async findOpenedByCar(car_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where:{
        car_id,
        end_date: IsNull()
      }
    });    
    return rental;
  }
  

}

export { RentalsRepository }