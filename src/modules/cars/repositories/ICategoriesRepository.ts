import { CreateCategoryDTO } from "../dtos/CreateCategoryDTO";
import { Category } from "../entities/Category";

interface ICategoriesRepository {
    create({ name, description }: CreateCategoryDTO):Promise<void>;
    findByName(name:string):Promise<Category>
    list():Promise<Category[]>;

}

export { ICategoriesRepository }