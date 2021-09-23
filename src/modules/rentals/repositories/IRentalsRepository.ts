import { CreateRentalDTO } from "../dtos/CreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
  create({ user_id, car_id, expected_return_date }:CreateRentalDTO): Promise<Rental>;
  findOpenedByUser(user_id: string): Promise<Rental>;
  findOpenedByCar(car_id: string): Promise<Rental>;

}

export { IRentalsRepository };