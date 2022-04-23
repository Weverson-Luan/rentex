import { Router, Request, Response } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController  } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListingCategoryController } from "@modules/cars/useCases/listingCategory/ListingCategoryController";

import { ensureAuthentication } from "@shared/infra/http/middlewares/ensureAuthentication";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin"

const routesCategories = Router();


const upload = multer({ dest: "./tmp" });

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listingCategoryController = new ListingCategoryController();

//cadastro de categorias.
routesCategories.post("/", ensureAuthentication, ensureAdmin ,createCategoryController.handle);

//buscar por categorias cadastradas.
routesCategories.get("/", listingCategoryController.handle);

routesCategories.post("/import", ensureAuthentication, ensureAdmin ,upload.single("file"), importCategoryController.handle);

export { routesCategories };
