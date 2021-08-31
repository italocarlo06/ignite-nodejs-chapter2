import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { CreateCategoryController } from "./CreateCategoryController";
import { CategoryRepository } from "../../repositories/implementations/CategoriesRepository";


const categoriesRepository = CategoryRepository.getInstance();
const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

const createCategoryController = new CreateCategoryController(createCategoryUseCase);
export { createCategoryController  }