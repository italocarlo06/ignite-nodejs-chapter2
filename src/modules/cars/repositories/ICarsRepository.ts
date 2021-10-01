import { CreateCarDTO } from "@modules/cars/dtos/CreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ListCarsDTO } from "../dtos/ListCarsDTO";

interface ICarsRepository {
    create({ name, description }: CreateCarDTO):Promise<Car>;
    findById(id:string):Promise<Car>
    findByName(name:string):Promise<Car>
    findByLicensePlate(license_plate:string):Promise<Car>;
    findAvailable({ brand, category_id, name }: ListCarsDTO):Promise<Car[]>;
    updateCarAvailable({ car_id , available }: UpdateCarAvaiableDTO):Promise<void>
    list():Promise<Car[]>;


}

export { ICarsRepository }