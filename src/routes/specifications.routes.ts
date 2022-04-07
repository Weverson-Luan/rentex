import { Router } from "express";
import { CreateSpecificationController } from "../modules/useCases/createSpecification/CreateSpecificationController";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const specification = Router();

const createSpecificationController = new CreateSpecificationController();

//middleware da nossa autenticação.
specification.use(ensureAuthentication);

//criação de uma especificação de carro.
specification.post("/", createSpecificationController.handle);

//buscar por todas especificação de carro cadastrada.
specification.get("/", createSpecificationController.handle);

export { specification };
