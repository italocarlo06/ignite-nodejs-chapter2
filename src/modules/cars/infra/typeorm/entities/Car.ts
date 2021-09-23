import { v4 as uuidv4 } from "uuid";
import { Entity, PrimaryColumn, Column, CreateDateColumn, JoinColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm"
import { Category } from "./Category";
import { Specification } from "./Specification";
import { CarImage } from "./CarImage";

@Entity("cars")
class Car {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  license_plate: string;

  @Column()
  brand: string;

  @Column()
  daily_rate: number;

  @Column()
  fine_amount: number;
  

  @Column({ default: true})
  available: boolean;

  @OneToMany(() => CarImage, carImage => carImage.car)
  images: CarImage[];

  @ManyToOne( () => Category)
  @JoinColumn({ name: "category_id"})
  category:Category

  @ManyToMany(() => Specification)
  @JoinTable({
    name: "specifications_cars",
    joinColumns:[{ name: "car_id"}],
    inverseJoinColumns:[{ name: "specification_id"}]
  })
  specifications:Specification[]

  @Column()
  category_id: string;

  @CreateDateColumn()
  created_at: Date;

  constructor (){
    if (!this.id){
      this.id = uuidv4();      
      this.available = true;
    }
  }
}

export { Car }