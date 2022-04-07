import "reflect-metadata";
import express, { NextFunction, Request,Response, } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import swaggerJson from "../swagger.json";

import "./database";
import "./shared/container";
import { AppError } from "./errors/AppError";

import { router } from "./routes/index.routes";
const app = express();

app.use(express.json());
app.use(
  "/api/v1/rent-cars-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJson)
);
app.use(router);

//middlewares de error
app.use((error: Error, request:Request, response: Response, next: NextFunction)=> {
  //verificar caso agente tenha algum error do tipo AppError
  
  if(error instanceof AppError){
    return response.status(error.statusCode).json({
      message: error.message,
    })
  }
  //se ele não for do tipo AppError vamos retornar status 500 por que ai e um error da propia aplicação
  return response.status(500).json({
    status: "error",
    message: `Internal server Error ${error.message}`
  }) 
  
})

app.listen(3333, () => console.log("Start is running !")); 
