import { Router } from "express";
import { createSpecificationController } from "../modules/useCases/createSpecification";

const specification = Router();

specification.post("/", (request, response) => {
  return createSpecificationController.handle(request, response);
});

export { specification };
