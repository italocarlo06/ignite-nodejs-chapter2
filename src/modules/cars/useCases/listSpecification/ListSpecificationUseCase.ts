import { inject, injectable } from "tsyringe";

import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";


@injectable()
class ListSpecificationUseCase {

  constructor ( 
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository){

  }
  async execute():Promise<Specification[]> {    
    return await this.specificationsRepository.list();          
  }
}

export { ListSpecificationUseCase }