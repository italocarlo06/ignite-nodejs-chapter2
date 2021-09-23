import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { RentalsInMemoryRepository } from "@modules/rentals/repositories/in-memory/RentalsInMemoryRepository";
import { AppError } from "@shared/errors/AppError";
import dayjs from "dayjs";

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepository: RentalsInMemoryRepository;
let dateProvider: DayjsDateProvider;
describe("Create Rental", () => {
  
  beforeEach( () => {
    rentalsRepository = new RentalsInMemoryRepository();
    dateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepository, dateProvider);  
  });

  it("should be able to create a new rental", async () => {    
    
    const rentalDate = dayjs().add(1,"day").toDate();
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: rentalDate
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("not should be able to create a new rental to a user if he has some opened", async () => {
    const rentalDate = dayjs().add(1,"day").toDate();

    expect( async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: rentalDate
      });

      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "121222",
        expected_return_date: rentalDate
      });

    }).rejects.toBeInstanceOf(AppError);
    

  });


  it("not should be able to create a new rental of a car if he has some opened", async () => {
    const rentalDate = dayjs().add(1,"day").toDate();
    expect( async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: rentalDate
      });

      await createRentalUseCase.execute({
        user_id: "12346",
        car_id: "121212",
        expected_return_date: rentalDate
      });

    }).rejects.toBeInstanceOf(AppError);
  });

  it("not should be able to create a new rental with expected return less than 24 hours", async () => {
    const rentalDate = dayjs().add(23,"hours").toDate();
    expect( async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: rentalDate
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});