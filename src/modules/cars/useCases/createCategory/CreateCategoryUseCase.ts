import { inject, injectable } from "tsyringe";

import { CreateCategoryDTO } from "@modules/cars/dtos/CreateCategoryDTO";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppError } from "@errors/AppError";

@injectable()
class CreateCategoryUseCase {
  constructor ( 
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ){

  }
  async  execute({ name, description }: CreateCategoryDTO):Promise<void> {
    const categoryAlreadExists = await this.categoriesRepository.findByName(name);
    if (!categoryAlreadExists){      
      await this.categoriesRepository.create({ name, description });      
    }
    else 
      throw new AppError("Category already exists");
  }
}

export { CreateCategoryUseCase }