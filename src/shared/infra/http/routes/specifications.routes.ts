import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecication/CreateSpecificationController";
import { ListingSpecificationsController } from "@modules/cars/useCases/listingSpecifications/ListingSpecificationsController";

import { ensureAuthentication } from "@shared/infra/http/middlewares/ensureAuthentication";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin"

const specification = Router();

const createSpecificationController = new CreateSpecificationController();
const listingSpecificationsController = new ListingSpecificationsController();

//criação de uma especificação de carro.
specification.post("/",ensureAuthentication, ensureAdmin, createSpecificationController.handle);

//buscar por todas especificação de carro cadastrada.
specification.get("/",ensureAuthentication, ensureAdmin, listingSpecificationsController.handle);

export { specification };
