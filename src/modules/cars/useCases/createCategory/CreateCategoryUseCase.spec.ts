import { CategoryInMemoryRepository } from "@modules/cars/repositories/in-memory/CategoryInMemoryRepository";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { AppError } from "@errors/AppError";

let categoriesInMemoryRepository: CategoryInMemoryRepository;
let createCategoryUseCase: CreateCategoryUseCase;
describe("Create Category Use Case Test", () => {
  
  beforeEach( () => {
    categoriesInMemoryRepository = new CategoryInMemoryRepository();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesInMemoryRepository);
  });

  it("should be able to create a new Category", async () => {
    
    const category = {
      name: "Category Test",
      description: "Description test"
    }
    await createCategoryUseCase.execute(category);

    const createdCategory = await categoriesInMemoryRepository.findByName(category.name);

    expect(createdCategory).toHaveProperty("id");

  });

  it("should not be able to create a new Category with a exist name", async () => {
    
    const category = {
      name: "Category Test",
      description: "Description test"
    }

    await createCategoryUseCase.execute(category);

    const category2 = {
      name: "Category Test",
      description: "Description test"
    }        

    await expect(
      createCategoryUseCase.execute(category2)
    ).rejects.toEqual(new AppError("Category already exists"));
    

  });


  
});