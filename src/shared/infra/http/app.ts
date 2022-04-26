import "reflect-metadata";
import "dotenv/config"; 
import express, { NextFunction, Request,Response, } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import swaggerJson from "../../../../swagger.json";
import upload from "@config/upload";

import createConnection from "@shared/infra/typeorm";
import "@shared/container";

import { AppError } from "@shared/infra/http/errors/AppError";

import { router } from "@shared/infra/http/routes/index.routes";


createConnection(); 
const app = express();

app.use(express.json()); 
app.use(
  "/api/v1/rent-cars-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJson)
);
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));
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
  
});

  export  { app };