import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

@Entity("rentals")
class Rental{
  
  @PrimaryColumn()
  id?: string;

  @ManyToOne( () => Car)
  @JoinColumn({ name: "car_id" })
  car: Car;

  @Column({ name: "car_id"})
  car_id: string;

  @Column({ name: "user_id"})
  user_id: string;

  @Column({ name: "start_date"})
  start_date: Date;

  @Column({ name: "end_date"})
  end_date?: Date;

  @Column({ name: "expected_return_date"})
  expected_return_date: Date;

  @Column()
  total?: number;

  @CreateDateColumn({ name: "created_at"})  
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at"})    
  updated_at: Date;

  constructor (){
    if (!this.id){
      this.id = uuidv4();
    }
  }
}

export { Rental }