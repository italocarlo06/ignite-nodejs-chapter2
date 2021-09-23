import { Entity, CreateDateColumn, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { v4 as uuidv4} from "uuid";
import { Car } from "./Car";

@Entity("cars_image")
class CarImage {
  
  @PrimaryColumn()
  id: string;
  
  @Column()
  car_id: string;
  
  @Column()
  image_name: string;
  
  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Car, car => car.images)
  car: Car;

  constructor(){
    if (!this.id){
      this.id = uuidv4();
    }
  }

}

export { CarImage }