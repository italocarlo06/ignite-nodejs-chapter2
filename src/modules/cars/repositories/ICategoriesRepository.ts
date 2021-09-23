import { CreateCategoryDTO } from "@modules/cars/dtos/CreateCategoryDTO";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";

interface ICategoriesRepository {
    create({ name, description }: CreateCategoryDTO):Promise<void>;
    findByName(name:string):Promise<Category>
    list():Promise<Category[]>;

}

export { ICategoriesRepository }