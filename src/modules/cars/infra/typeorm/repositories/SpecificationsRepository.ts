import { Repository, getRepository } from "typeorm";

import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { CreateSpecificationDTO } from "@modules/cars/dtos/CreateSpecificationDTO";
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

class SpecificationsRepository implements ISpecificationsRepository{
  private repository: Repository<Specification>;

  constructor () {
    this.repository = getRepository(Specification);
  }
 
  async create({ name, description }: CreateSpecificationDTO):Promise<Specification>{
    const specification = this.repository.create({
      name,
      description
    });
    
    await this.repository.save(specification);    

    return specification;
  }

  async list():Promise<Specification[]>{
    const specifications = await this.repository.find();
    return specifications;
  }

  async findByName(name:string):Promise<Specification>{
    const specification = await this.repository.findOne({
      where:{
        name
      }
    });
    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.findByIds(ids);
    return specifications;
  }
  



}

export { SpecificationsRepository }