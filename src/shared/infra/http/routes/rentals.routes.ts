import { Router } from 'express';

import { ensureIsAdmin } from "@shared/infra/http/middlewares/ensureIsAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentals/ListRentalsByUserController';

const createRentalController = new CreateRentalController();
const listRentalsByUser = new ListRentalsByUserController();
const devolutionRentalController = new DevolutionRentalController();

const rentalsRoutes = Router();

rentalsRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalsRoutes.post("/devolution/:rental_id", ensureAuthenticated, devolutionRentalController.handle);
rentalsRoutes.get("/user", ensureAuthenticated, listRentalsByUser.handle);

export { rentalsRoutes };
