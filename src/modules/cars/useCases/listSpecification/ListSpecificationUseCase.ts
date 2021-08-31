import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";
import { Category } from "../../models/Category";


class ListSpecificationUseCase {
  constructor ( private categoriesRepository: ISpecificationsRepository){

  }
  execute():Category[] {    
    return this.categoriesRepository.list();          
  }
}

export { ListSpecificationUseCase }