import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/CreateCar/CreateCarController";
import { ListingAvailableCarController } from "@modules/cars/useCases/ListingCar/ListingAvailableCarController";
import { ensureAuthentication } from "@shared/infra/http/middlewares/ensureAuthentication";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";

const car = Router();

const createCarController = new CreateCarController();
const listingAvailableCarController = new ListingAvailableCarController();

// //middleware da nossa autenticação.
// car.use(ensureAuthentication);

//criação de uma especificação de carro.
car.post("/", ensureAuthentication, ensureAdmin ,createCarController.handle);

//buscar por todos os carro cadastrada.
car.get("/", listingAvailableCarController.handle);

export { car };
