import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalsControllerUseCase";

import { ensureAuthentication} from "@shared/infra/http/middlewares/ensureAuthentication"

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();


rentalsRoutes.post("/", ensureAuthentication, createRentalController.handle);

export { rentalsRoutes };