import { CarsInMemoryRepository } from "@modules/cars/repositories/in-memory/CarsInMemoryRepository";
import { CarsImagesInMemoryRepository } from "@modules/cars/repositories/in-memory/CarsImagesInMemoryRepository";
import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";
import { AppError } from "@errors/AppError";

let carsRepository: CarsInMemoryRepository;
let carsImagesRepository: CarsImagesInMemoryRepository;
let uploadCarImagesUseCase: UploadCarImagesUseCase;


describe("Upload Car Image", () => {

  beforeEach( () => {
    carsRepository = new CarsInMemoryRepository();
    carsImagesRepository = new CarsImagesInMemoryRepository();
    uploadCarImagesUseCase = new UploadCarImagesUseCase(carsImagesRepository,carsRepository);
  })
  it("should be able to upload a new image to a car", async () => {

    const car = await carsRepository.create({
      name : "Name Car", 
      description: "Description", 
      fine_amount: 100, 
      license_plate: "123456", 
      category_id: "123456", 
      brand: "VW", 
      daily_rate: 2 
    });

    const images_name = ["123465.jpg"];

    await uploadCarImagesUseCase.execute({
      car_id: car.id,
      images_name
    });
    
    const images = await carsImagesRepository.findByCar(car.id);
    expect(images.length).toBe(1);

  });
  
  it("not should be able to upload a new image to a non exists car", async () => {

    const images_name = ["123465.jpg"];
    
    await expect( uploadCarImagesUseCase.execute({
        car_id: "123456",
        images_name
      })      
    ).rejects.toEqual(new AppError("Car is not registered!"));
  });
 

});