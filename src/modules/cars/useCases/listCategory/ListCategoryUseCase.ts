import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { injectable, inject } from "tsyringe";

import { Category } from "@modules/cars/infra/typeorm/entities/Category";


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