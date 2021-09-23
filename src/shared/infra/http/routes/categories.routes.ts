import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ListCategoryController } from "@modules/cars/useCases/listCategory/ListCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ensureIsAdmin } from "@shared/infra/http/middlewares/ensureIsAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp"
});

const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoryController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.post("/", ensureAuthenticated, ensureIsAdmin, createCategoryController.handle);

categoriesRoutes.get("/", listCategoryController.handle);

categoriesRoutes.post("/import", ensureAuthenticated, ensureIsAdmin,upload.single("file"),importCategoryController.handle);

export { categoriesRoutes };
