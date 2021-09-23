import { CreateCarUseCase } from "./CreateCarUseCase";
import { CarsInMemoryRepository } from "@modules/cars/repositories/in-memory/CarsInMemoryRepository";
import { AppError } from "@shared/errors/AppError";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsInMemoryRepository;
describe("Create Car", () => {
  
  beforeEach( () => {
    carsRepository= new CarsInMemoryRepository();
    createCarUseCase = new CreateCarUseCase(carsRepository);    
  });
  it("it should be able to create a new car", async () => {
    const car = {
      name : "Name Car", 
      description: "Descriptin", 
      fine_amount: 100, 
      license_plate: "123456", 
      category_id: "123456", 
      brand: "VW", 
      daily_rate: 2 
    };
    const createdCar = await createCarUseCase.execute(car);
    
    expect(createdCar).toHaveProperty("id");
  });

  it("it should be able to create a new car with available true", async () => {
    const car = {
      name : "Name Car", 
      description: "Descriptin", 
      fine_amount: 100, 
      license_plate: "123456", 
      category_id: "123456", 
      brand: "VW", 
      daily_rate: 2 
    };
    const createdCar = await createCarUseCase.execute(car);

    
    expect(createdCar.available).toBe(true);
  });

  it("it not should be able to create a new car with a license plate already used", async () => {
    expect( async () => {
      await createCarUseCase.execute({
        name : "Car 1", 
        description: "Description", 
        fine_amount: 100, 
        license_plate: "123456", 
        category_id: "123456", 
        brand: "VW", 
        daily_rate: 2 
      });

      await createCarUseCase.execute({
        name : "Car 2", 
        description: "Description", 
        fine_amount: 100, 
        license_plate: "123456", 
        category_id: "123456", 
        brand: "VW", 
        daily_rate: 2 
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});