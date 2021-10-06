import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { ListUsersController } from "@modules/accounts/useCases/listUsers/listUsersController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ensureIsAdmin } from "@shared/infra/http/middlewares/ensureIsAdmin";
import { ProfileUserController } from "@modules/accounts/useCases/profileUserUseCase/ProfileUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

const uploadAvatar = multer(uploadConfig);



usersRoutes.post("/", ensureAuthenticated, ensureIsAdmin, createUserController.handle);  

usersRoutes.get("/", ensureAuthenticated, ensureIsAdmin, listUsersController.handle);  

usersRoutes.get("/profile", ensureAuthenticated, profileUserController.handle);  

usersRoutes.patch("/avatar", 
  ensureAuthenticated,
  uploadAvatar.single("avatar") ,  
  updateUserAvatarController.handle,
);


export { usersRoutes };
