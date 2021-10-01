import { AppError } from "@shared/errors/AppError";
import dayjs from "dayjs";

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

import { RentalsInMemoryRepository } from "@modules/rentals/repositories/in-memory/RentalsInMemoryRepository";
import { CarsInMemoryRepository } from "@modules/cars/repositories/in-memory/CarsInMemoryRepository";

import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { CreateCarUseCase } from "../../../cars/useCases/createCar/CreateCarUseCase";

let createRentalUseCase: CreateRentalUseCase;
let createCarUseCase: CreateCarUseCase;

let rentalsRepository: RentalsInMemoryRepository;
let carsRepository: CarsInMemoryRepository;
let dateProvider: DayjsDateProvider;
describe("Create Rental", () => {
  
  beforeEach( () => {
    rentalsRepository = new RentalsInMemoryRepository();
    dateProvider = new DayjsDateProvider();
    carsRepository= new CarsInMemoryRepository();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepository, 
      dateProvider,
      carsRepository
    );  
    createCarUseCase = new CreateCarUseCase(carsRepository);    
  });

  it("should be able to create a new rental", async () => {    
    
    const car = await createCarUseCase.execute({
      name : "Name Car", 
      description: "Descriptin", 
      fine_amount: 100, 
      license_plate: "123456", 
      category_id: "123456",       
      daily_rate: 2,
      brand: "VW"
    });
    const rentalDate = dayjs().add(1,"day").toDate();
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id as string,
      expected_return_date: rentalDate
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");    
  });

  it("not should be able to create a new rental to a user if he has some opened", async () => {
    const rentalDate = dayjs().add(1,"day").toDate();

    const car = await createCarUseCase.execute({
      name : "Name Car", 
      description: "Descriptin", 
      fine_amount: 100, 
      license_plate: "123456", 
      category_id: "123456",       
      daily_rate: 2,
      brand: "VW"
    });
    
    await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id as string,
      expected_return_date: rentalDate
    });

    await expect( 
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: car.id as string,
        expected_return_date: rentalDate
      })
    ).rejects.toEqual(new AppError("A rental is opened by this car!"));
    

  });


  it("not should be able to create a new rental of a car if he has some opened", async () => {
    const rentalDate = dayjs().add(1,"day").toDate();

    const car = await createCarUseCase.execute({
      name : "Name Car", 
      description: "Descriptin", 
      fine_amount: 100, 
      license_plate: "123456", 
      category_id: "123456",       
      daily_rate: 2,
      brand: "VW"
    });

    const car2 = await createCarUseCase.execute({
      name : "Name Car 2", 
      description: "Description", 
      fine_amount: 100, 
      license_plate: "123465", 
      category_id: "123456",       
      daily_rate: 2,
      brand: "VW"
    });
    
    
    await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id as string,
      expected_return_date: rentalDate
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "12346",
        car_id: car2.id,
        expected_return_date: rentalDate
      })

    ).rejects.toEqual(new AppError("A rental is opened by this car!"));
  });

  it("not should be able to create a new rental with expected return less than 24 hours", async () => {
    const rentalDate = dayjs().add(23,"hours").toDate();
    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: rentalDate
      })
    ).rejects.toEqual(new AppError("Invalid return time!"));
  });
});