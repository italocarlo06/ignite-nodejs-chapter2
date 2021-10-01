import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CreateCarDTO } from "@modules/cars/dtos/CreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ListCarsDTO } from "@modules/cars/dtos/ListCarsDTO";

class CarsInMemoryRepository implements ICarsRepository {

  
  
  private cars: Car[] = [];

  async create({ 
    name, 
    description,
    brand,
    category_id,
    fine_amount,
    daily_rate,
    license_plate,
    specifications,
    id
  }: CreateCarDTO): Promise<Car> {    

    const car = new Car();
    Object.assign(car, {
      name, 
      description,
      brand,
      category_id,
      fine_amount,
      daily_rate,
      license_plate,
      specifications,
      id
    });    
    this.cars.push(car);   
    return car; 
  }
  async findByName(name: string): Promise<Car> {
    const car = this.cars.find( car => car.name === name);
    return car;
  }

  async list(): Promise<Car[]> {
    const cars = this.cars;

    return cars;
  }

  async  findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find( car => car.license_plate === license_plate);
    return car;
  }

  async findAvailable({ brand, category_id, name }: ListCarsDTO): Promise<Car[]> {
    const cars = this.cars
    .filter( car => car.available === true)
    .filter( car => (brand && car.brand === brand) 
      || (category_id && car.category_id === category_id) 
      || (name && car.name === name)
      || (!brand && !category_id && !name)
    );    
    
    return cars;
  }

  async findById(id: string): Promise<Car> {
    const car = this.cars.find( car => car.id === id);
    return car;
  }

  async updateCarAvailable({ car_id, available }: UpdateCarAvaiableDTO): Promise<void> {    
    const carIndex = this.cars.findIndex( car => car.id === car_id);    
    Object.assign( this.cars[carIndex], {
      available
    });    
  }

}

export { CarsInMemoryRepository };