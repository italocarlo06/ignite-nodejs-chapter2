import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { CreateCategoryDTO } from "@modules/cars/dtos/CreateCategoryDTO";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";

class CategoryInMemoryRepository implements ICategoriesRepository {

  private categories: Category[] = [];

  async create({ name, description }: CreateCategoryDTO): Promise<void> {    

    const category = new Category();
    Object.assign(category, {
      name,
      description
    });    
    this.categories.push(category);    
  }
  async findByName(name: string): Promise<Category> {
    const category = this.categories.find( category => category.name === name);
    return category;
  }

  async list(): Promise<Category[]> {
    const categories = this.categories;

    return categories;
  }

}

export { CategoryInMemoryRepository };