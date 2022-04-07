import { Router } from "express";
import multer from "multer";
import uploadConfig from "../config/upload";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdatedUserAvatarController } from "../modules/accounts/useCases/updatedUserAvatar/UpdatedUserAvatarController";


const users = Router();

const createUserController = new CreateUserController();
const updatedAvatarControler = new UpdatedUserAvatarController();

//upload
const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"))



//criação de uma usuário.
users.post("/", createUserController.handle); 

//buscar por todas usuários.
users.patch("/avatar", ensureAuthentication, uploadAvatar.single('avatar_file'),updatedAvatarControler.handle);

export { users };
