
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";
import { CarsInMemoryRepository } from "@modules/cars/repositories/in-memory/CarsInMemoryRepository";
import { SpecificationsInMemoryRepository} from "@modules/cars/repositories/in-memory/SpecificationsInMemoryRepository";
import { AppError } from "@errors/AppError";

let createCarUseCaseSpecification: CreateCarSpecificationUseCase;
let carsRepository: CarsInMemoryRepository;
let specificationsRepository: SpecificationsInMemoryRepository;
describe("Create Car Specification", () => {

  beforeEach( () => {
    carsRepository = new CarsInMemoryRepository();
    specificationsRepository= new SpecificationsInMemoryRepository();
    createCarUseCaseSpecification = new CreateCarSpecificationUseCase(
      carsRepository,
      specificationsRepository
    );
  });

  it("should be able to add a new specification to car", async () => {
    const car = await carsRepository.create({
        name : "Name Car", 
        description: "Descriptin", 
        fine_amount: 100, 
        license_plate: "123456", 
        category_id: "123456", 
        brand: "VW", 
        daily_rate: 2 
    });

    const specification = await specificationsRepository.create({
      name: "test",
      description: "test"
    });
    
    const specificationsCars = await createCarUseCaseSpecification.execute({
       car_id: car.id,
       specifications_id:[specification.id]
     });
    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });

  it("should not be able to add a new specification to car that not exists", async () => {
    await expect(
      createCarUseCaseSpecification.execute({
        car_id: "132465",
        specifications_id:["123465"]
      })
    ).rejects.toEqual(new AppError("Car does not exists!"));
 });

});