import { Router } from 'express';
import multer from 'multer';
import uploadConfig from "@config/upload";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ensureIsAdmin } from "@shared/infra/http/middlewares/ensureIsAdmin";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImageController } from "@modules/cars/useCases/uploadImage/UploadCarImagesController";

const carsRoutes = Router();

const uploadImages = multer(uploadConfig.upload("./tmp/cars"));

const createCarController = new CreateCarController();
const createCarSpecicationController = new CreateCarSpecificationController();
const listAvailableCarsController = new ListAvailableCarsController();
const uploadCarImage = new UploadCarImageController();

carsRoutes.post("/", ensureAuthenticated, ensureIsAdmin, createCarController.handle);
carsRoutes.post(
  "/:id/specifications", 
  ensureAuthenticated, 
  ensureIsAdmin,
  createCarSpecicationController.handle
);
carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.post("/:id/images", 
  ensureAuthenticated,
  ensureIsAdmin,
  uploadImages.array("images") ,  
  uploadCarImage.handle,
);

export { carsRoutes };
