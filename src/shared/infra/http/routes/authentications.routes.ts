import { Router } from "express";

import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";

const authentication = Router();

const authenticationController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

//fazer autenticação de um  usuário.
authentication.post("/sessions", authenticationController.handle);
authentication.post("/refresh-token", refreshTokenController.handle);


export { authentication };
