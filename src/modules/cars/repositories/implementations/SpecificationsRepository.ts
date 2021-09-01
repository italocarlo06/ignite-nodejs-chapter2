import { Repository, getRepository } from "typeorm";

import { ISpecificationsRepository } from "../ISpecificationsRepository";
import { CreateSpecificationDTO } from "../../dtos/CreateSpecificationDTO";
import { Specification } from '../../entities/Specification';

class SpecificationsRepository implements ISpecificationsRepository{
  private repository: Repository<Specification>;

  constructor () {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: CreateSpecificationDTO):Promise<void>{
    const category = this.repository.create({
      name,
      description
    });
    
    await this.repository.save(category);    
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

}

export { SpecificationsRepository }