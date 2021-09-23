import { Repository, getRepository } from "typeorm";

import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";

class CarsImagesRepository implements ICarsImagesRepository {

  private repository: Repository<CarImage> 

  constructor(){
    this.repository = getRepository(CarImage);
  }
  
  async findByCar(car_id: string): Promise<CarImage[]> {
    const images = await this.repository.find({
      where: {
        car_id
      }
    });
    return images;
  }
  
  async create({ car_id, image_name }: CreateCarImageDTO): Promise<CarImage> {
    const carImage = this.repository.create({ car_id, image_name});

    await this.repository.save(carImage);

    return carImage;
  }
  
}

export { CarsImagesRepository };