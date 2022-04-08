import { Router } from "express";

import {  authenticateUserController } from "@modules/accounts/useCases/authenticateUser/authenticateUserController";

const authentication = Router();

const authenticationController = new authenticateUserController();

//fazer autenticação de um  usuário.
authentication.post("/sessions", authenticationController.handle);


export { authentication };
