import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { ListUsersController } from "../modules/accounts/useCases/listUsers/listUsersController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import uploadConfig from "../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const updateUserAvatarController = new UpdateUserAvatarController();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));



usersRoutes.post("/", createUserController.handle);  

usersRoutes.get("/", listUsersController.handle);  

usersRoutes.patch("/avatar", 
  ensureAuthenticated,
  uploadAvatar.single("avatar") ,  
  updateUserAvatarController.handle,
);


export { usersRoutes };
