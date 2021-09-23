import { Router } from 'express';
import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController"
import { ListSpecificationController } from '@modules/cars/useCases/listSpecification/ListSpecificationController';
import { ensureIsAdmin } from '@shared/infra/http/middlewares/ensureIsAdmin';
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

specificationsRoutes.post("/", ensureAuthenticated, ensureIsAdmin, createSpecificationController.handle);  

specificationsRoutes.get("/",listSpecificationController.handle);



export { specificationsRoutes };
