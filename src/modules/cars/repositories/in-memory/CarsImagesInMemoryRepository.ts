import { ICarsImagesRepository } from "../ICarsImagesRepository";
import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";

class CarsImagesInMemoryRepository implements ICarsImagesRepository{
  
  private carsImage: CarImage[] = [];

  async create({ car_id, image_name }: CreateCarImageDTO): Promise<CarImage> {
    const carImage = new CarImage();
    Object.assign(carImage,{
      car_id,
      image_name
    });

    this.carsImage.push(carImage);

    return carImage;
  }

  async findByCar(car_id: string): Promise<CarImage[]> {
    const cars = this.carsImage.filter( image => image.car_id === car_id);
    return cars;
  }

}

export { CarsImagesInMemoryRepository }