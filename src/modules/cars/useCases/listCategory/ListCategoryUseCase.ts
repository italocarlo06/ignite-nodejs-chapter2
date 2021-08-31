import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { Category } from "../../models/Category";


class ListCategoryUseCase {
  constructor ( private categoriesRepository: ICategoriesRepository){

  }
  execute():Category[] {    
    return this.categoriesRepository.list();          
  }
}

export { ListCategoryUseCase }