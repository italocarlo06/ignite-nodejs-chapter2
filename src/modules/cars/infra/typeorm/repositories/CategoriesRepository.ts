import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { CreateCategoryDTO } from "@modules/cars/dtos/CreateCategoryDTO";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { Repository, getRepository } from "typeorm";


class CategoriesRepository implements ICategoriesRepository{
  
  private repository: Repository<Category>;

  constructor () {
    this.repository = getRepository(Category);
  }


  async create({ name, description }: CreateCategoryDTO):Promise<void>{
    const category = this.repository.create({
      description,
      name
    });
    
    await this.repository.save(category);


  }

  async list():Promise<Category[]>{
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name:string):Promise<Category>{
    //const category = this.categories.find(category => category.name === name);
    const category = await this.repository.findOne({
      where:{
        name
      }
    })
    return category;
  }
}

export { CategoriesRepository };