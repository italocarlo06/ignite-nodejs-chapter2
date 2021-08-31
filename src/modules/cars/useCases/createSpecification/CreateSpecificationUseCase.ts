import { CreateSpecificationDTO } from "../../dtos/CreateSpecificationDTO";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";


class CreateSpecificationUseCase {
  constructor ( private specificationsRepository: ISpecificationsRepository){

  }
  execute({ name, description }: CreateSpecificationDTO):void {
    const specificationAlreadExists = this.specificationsRepository.findByName(name);
    if (!specificationAlreadExists){
      this.specificationsRepository.create({ name, description });      
    }
    else 
      throw new Error("Specification already exists");
  }
}

export { CreateSpecificationUseCase }