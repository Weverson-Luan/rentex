import { Router, Request, Response } from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController  } from "../modules/useCases/importCategory/ImportCategoryController";

import { SearchCategoryController } from "../modules/useCases/SearchCategory/SearchCategoryController";

const routesCategories = Router();


const upload = multer({ dest: "./tmp" });

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const searchCategoryController = new SearchCategoryController();

//cadastro de categorias.
routesCategories.post("/", createCategoryController.handle);

//buscar por categorias cadastradas.
routesCategories.get("/", searchCategoryController.handle);

routesCategories.post("/import",upload.single("file"), importCategoryController.handle);

export { routesCategories };
