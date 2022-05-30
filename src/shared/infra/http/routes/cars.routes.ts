import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/CreateCar/CreateCarController";
import { ListingAvailableCarController } from "@modules/cars/useCases/ListingAvailableCars/ListingAvailableCarController";
import { ensureAuthentication } from "@shared/infra/http/middlewares/ensureAuthentication";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";

const car = Router();

const createCarController = new CreateCarController();
const listingAvailableCarController = new ListingAvailableCarController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

// //middleware da nossa autenticação.
// car.use(ensureAuthentication);

//upload
const uploadCarImages = multer(uploadConfig)

//criação de uma especificação de carro.
car.post("/", ensureAuthentication, ensureAdmin ,createCarController.handle);


car.post("/specifications/:id", ensureAuthentication, ensureAdmin ,createCarSpecificationController.handle);

//buscar por todos os carro cadastrada.
car.get("/available", listingAvailableCarController.handle);

//fazer criação de images para um carro
car.post("/images/:id", ensureAuthentication, ensureAdmin , uploadCarImages.array("images"), uploadCarImagesController.handle);

export { car };
