import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";
import { CarsInMemoryRepository } from "@modules/cars/repositories/in-memory/CarsInMemoryRepository";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsInMemoryRepository: CarsInMemoryRepository;


describe("List Cars", () => {

  beforeEach(() => {
    carsInMemoryRepository= new CarsInMemoryRepository();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsInMemoryRepository);
  });
  it("should be able to list all cars", async () => {
    const car = { 
        name : "Name Car", 
        description: "Descriptin", 
        fine_amount: 100, 
        license_plate: "123456", 
        category_id: "ada1ea1c-e257-4f8a-aa29-30f5a1708c1e", 
        brand: "VW", 
        daily_rate: 2 
    };
    const createdCar = await carsInMemoryRepository.create(car)
    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([createdCar]);
  });

  it("should be able to list all cars available by category", async () => {
    const car = { 
        name : "Name Car", 
        description: "Descriptin", 
        fine_amount: 100, 
        license_plate: "123456", 
        category_id: "ada1ea1c-e257-4f8a-aa29-30f5a1708c1e", 
        brand: "VW", 
        daily_rate: 2 
    };
    const createdCar = await carsInMemoryRepository.create(car)
    const cars = await listAvailableCarsUseCase.execute({ category_id: car.category_id});

    expect(cars).toEqual([createdCar]);
  });


  it("should be able to list all cars available by name", async () => {
    const car = { 
        name : "Name Car", 
        description: "Descriptin", 
        fine_amount: 100, 
        license_plate: "123456", 
        category_id: "ada1ea1c-e257-4f8a-aa29-30f5a1708c1e", 
        brand: "VW", 
        daily_rate: 2 
    };
    const createdCar = await carsInMemoryRepository.create(car)
    const cars = await listAvailableCarsUseCase.execute({ name: car.name });

    expect(cars).toEqual([createdCar]);
  });

  it("should be able to list all cars available by brand", async () => {
    const car = { 
        name : "Name Car", 
        description: "Descriptin", 
        fine_amount: 100, 
        license_plate: "123456", 
        category_id: "ada1ea1c-e257-4f8a-aa29-30f5a1708c1e", 
        brand: "VW", 
        daily_rate: 2 
    };
    const createdCar = await carsInMemoryRepository.create(car)

    const car2 = { 
      name : "Name Car 2", 
      description: "Description", 
      fine_amount: 100, 
      license_plate: "123457", 
      category_id: "ada1ea1c-e257-4f8a-aa29-30f5a1708c1e", 
      brand: "Chevrolet", 
      daily_rate: 2 
  };
  const createdCar2 = await carsInMemoryRepository.create(car2)

    const cars = await listAvailableCarsUseCase.execute({ brand: "Chevrolet" });

    expect(cars).toEqual([createdCar2]);
  });
})