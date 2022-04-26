import { Router } from "express";

import { SendForgotPasswordController } from "@modules/accounts/useCases/sendForgotPassword/SendForgotPasswordController";
import { ResetPasswordUserController } from "@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController";

import { ensureAuthentication} from "@shared/infra/http/middlewares/ensureAuthentication";


const passwordRoutes = Router();

const sendForgotPasswordController = new SendForgotPasswordController();
const resetPasswordUserController = new ResetPasswordUserController();

passwordRoutes.post("/forgot", ensureAuthentication, sendForgotPasswordController.handle);
passwordRoutes.post("/reset", ensureAuthentication, resetPasswordUserController.handle);


export { passwordRoutes };