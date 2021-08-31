import { CategoryRepository } from '../../repositories/implementations/CategoriesRepository';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';
import { ImportCategoryController } from './ImportCategoryController';

const categoriesRepository = CategoryRepository.getInstance();

const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);

const importCategoryController = new ImportCategoryController(importCategoryUseCase);

export { importCategoryController }

