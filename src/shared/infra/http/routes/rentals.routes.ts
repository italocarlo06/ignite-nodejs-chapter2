import { Router } from 'express';

import { ensureIsAdmin } from "@shared/infra/http/middlewares/ensureIsAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";

const createRentalController = new CreateRentalController();

const rentalsRoutes = Router();

rentalsRoutes.post("/", ensureAuthenticated, createRentalController.handle);

export { rentalsRoutes };
