import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";

import { ensureAuthentication } from "@shared/infra/http/middlewares/ensureAuthentication";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin"

const specification = Router();

const createSpecificationController = new CreateSpecificationController();


//criação de uma especificação de carro.
specification.post("/",ensureAuthentication, ensureAdmin, createSpecificationController.handle);

//buscar por todas especificação de carro cadastrada.
specification.get("/",ensureAuthentication, ensureAdmin, createSpecificationController.handle);

export { specification };
