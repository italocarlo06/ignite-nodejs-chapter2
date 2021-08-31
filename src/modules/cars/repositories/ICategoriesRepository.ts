import { CreateCategoryDTO } from "../dtos/CreateCategoryDTO";
import { Category } from "../models/Category";

interface ICategoriesRepository {
    create({ name, description }: CreateCategoryDTO):void;
    findByName(name:string):Category
    list():Category[];

}

export { ICategoriesRepository }