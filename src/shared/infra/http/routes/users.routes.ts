import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { ensureAuthentication } from "@shared/infra/http/middlewares/ensureAuthentication";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdatedUserAvatarController } from "@modules/accounts/useCases/updatedUserAvatar/UpdatedUserAvatarController";
import { ProfileUserController } from "@modules/accounts/useCases/profileUser/ProfileUserController";

const users = Router();

const createUserController = new CreateUserController();
const updatedAvatarController = new UpdatedUserAvatarController();
const profileUserController = new ProfileUserController();

//upload
const uploadAvatar = multer(uploadConfig);

//criação de uma usuário.
users.post("/", createUserController.handle); 

//buscar por todas usuários.
users.patch("/avatar", ensureAuthentication, uploadAvatar.single('avatar_file'),updatedAvatarController.handle);

//Buscar por um usuário.
users.get("/profile", ensureAuthentication, profileUserController.handle); 

export { users };
