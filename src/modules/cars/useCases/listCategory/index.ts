import { CategoryRepository } from '../../repositories/implementations/CategoriesRepository';
import { ListCategoryUseCase } from './ListCategoryUseCase';
import { ListCategoryController } from './ListCategoryController';

const categoriesRepository = CategoryRepository.getInstance();

const listCategoryUseCase = new ListCategoryUseCase(categoriesRepository);

const listCategoryController = new ListCategoryController(listCategoryUseCase);

export { listCategoryController };