import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { Category } from "../../entities/Category";
import { injectable, inject } from "tsyringe";


@injectable()
class ListCategoryUseCase {

  constructor ( 
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository){

  }
  async execute():Promise<Category[]> {    
    return await this.categoriesRepository.list();          
  }
}

export { ListCategoryUseCase }