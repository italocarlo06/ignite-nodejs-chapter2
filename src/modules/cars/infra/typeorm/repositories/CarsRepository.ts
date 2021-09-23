import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CreateCarDTO } from "@modules/cars/dtos/CreateCarDTO";
import { Repository, getRepository } from "typeorm";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ListCarsDTO } from "@modules/cars/dtos/ListCarsDTO";

class CarsRepository implements ICarsRepository {
  
  private repository: Repository<Car>;

  constructor () {
    this.repository = getRepository(Car);
  }
  
  
  async create({ 
    name, 
    description, 
    license_plate, 
    daily_rate, 
    fine_amount, 
    category_id, 
    brand,
    specifications,
    id
  }: CreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name, 
      description, 
      license_plate, 
      daily_rate, 
      fine_amount, 
      category_id, 
      brand,
      id,
      specifications
    });
    
    await this.repository.save(car);
    return car;
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne({
      where: {
        id
      }
    });
    return car;
  }
  
  
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({
      where: {
        license_plate
      }
    });
    return car;
  }


  async findByName(name: string): Promise<Car> {
    const car = await this.repository.findOne({
      where: {
        name
      }
    });

    return car;
  }
  async list(): Promise<Car[]> {
    const cars = await this.repository.find();
    return cars;
  }

  async findAvailable({ brand, category_id, name }: ListCarsDTO): Promise<Car[]> {
    const conditions = {
      available: true
    };
    
    if (brand){
      Object.assign(conditions, {
        brand
      });
    }

    if (name){
      Object.assign(conditions, {
        name
      });
    }

    if (category_id){
      Object.assign(conditions, {
        category_id
      });
    }    

    const cars = await this.repository.find({
      where:{
        ...conditions
      }
    });
    return cars;
  }


}

export { CarsRepository }