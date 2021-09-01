import { inject, injectable } from "tsyringe";

import { CreateCategoryDTO } from "../../dtos/CreateCategoryDTO";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

@injectable()
class CreateCategoryUseCase {
  constructor ( 
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ){

  }
  async execute({ name, description }: CreateCategoryDTO):Promise<void> {
    const categoryAlreadExists = await this.categoriesRepository.findByName(name);
    if (!categoryAlreadExists){
      this.categoriesRepository.create({ name, description });      
    }
    else 
      throw new Error("Category already exists");
  }
}

export { CreateCategoryUseCase }