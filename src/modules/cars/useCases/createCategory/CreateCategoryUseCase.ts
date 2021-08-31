import { CreateCategoryDTO } from "../../dtos/CreateCategoryDTO";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";


class CreateCategoryUseCase {
  constructor ( private categoriesRepository: ICategoriesRepository){

  }
  execute({ name, description }: CreateCategoryDTO):void {
    const categoryAlreadExists = this.categoriesRepository.findByName(name);
    if (!categoryAlreadExists){
      this.categoriesRepository.create({ name, description });      
    }
    else 
      throw new Error("Category already exists");
  }
}

export { CreateCategoryUseCase }