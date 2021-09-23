import { CarImage } from "../infra/typeorm/entities/CarImage";

interface ICarsImagesRepository {
  create({ car_id , image_name }: CreateCarImageDTO): Promise<CarImage>;
  findByCar(car_id: string):Promise<CarImage[]>;
}

export { ICarsImagesRepository };