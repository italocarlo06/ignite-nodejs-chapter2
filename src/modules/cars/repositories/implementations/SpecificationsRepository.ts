import { ISpecificationsRepository } from '../ISpecificationsRepository';
import { CreateSpecificationDTO } from '../../dtos/CreateSpecificationDTO';
import { Specification } from '../../models/Specification';

class SpecificationsRepository implements ISpecificationsRepository{
  private specifications: Specification[];

  private static INSTANCE: SpecificationsRepository;

  private constructor () {
    this.specifications = [];
  }

  public static getInstance():SpecificationsRepository {
    if(!SpecificationsRepository.INSTANCE){
      SpecificationsRepository.INSTANCE = new SpecificationsRepository();
    }

    return SpecificationsRepository.INSTANCE;
  }
  create({ name, description }: CreateSpecificationDTO):void{
    const category = new Specification();  
  
    Object.assign(category, {
      name,
      description,    
      createdAt: new Date()
    });  
    this.specifications.push(category);
  }

  list():Specification[]{
    return this.specifications;
  }

  findByName(name:string):Specification{
    const specification = this.specifications.find(specification => specification.name === name);
    return specification;
  }

}

export { SpecificationsRepository }