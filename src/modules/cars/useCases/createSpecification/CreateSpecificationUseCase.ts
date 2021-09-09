import { CreateSpecificationDTO } from "../../dtos/CreateSpecificationDTO";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";
import { injectable, inject } from "tsyringe";
import { AppError } from "../../../../errors/AppError";

@injectable()
class CreateSpecificationUseCase {

  constructor ( 
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository){

  }
  async execute({ name, description }: CreateSpecificationDTO):Promise<void> {
    const specificationAlreadExists = await this.specificationsRepository.findByName(name);
    if (!specificationAlreadExists){
      await this.specificationsRepository.create({ name, description });      
    }
    else 
      throw new AppError("Specification already exists");
  }
}

export { CreateSpecificationUseCase }