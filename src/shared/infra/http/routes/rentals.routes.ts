import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalsControllerUseCase";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/devolutionRentalController";
import { ListingRentalsByUserController } from "@modules/rentals/useCases/listingRentalsByUser/listingRentalsByUserController";

import { ensureAuthentication} from "@shared/infra/http/middlewares/ensureAuthentication";


const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listingRentalsByUserController = new ListingRentalsByUserController();


rentalsRoutes.post("/", ensureAuthentication, createRentalController.handle);
rentalsRoutes.post("/devolution/:id", ensureAuthentication, devolutionRentalController.handle);
rentalsRoutes.get("/schedules", ensureAuthentication, listingRentalsByUserController.handle);

export { rentalsRoutes };