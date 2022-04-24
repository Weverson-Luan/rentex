import { Router } from "express";

import { SendForgotPasswordController } from "@modules/accounts/useCases/sendForgotPassword/SendForgotPasswordController";


import { ensureAuthentication} from "@shared/infra/http/middlewares/ensureAuthentication";


const passwordRoutes = Router();

const sendForgotPasswordController = new SendForgotPasswordController();


passwordRoutes.post("/forgot", ensureAuthentication, sendForgotPasswordController.handle);


export { passwordRoutes };