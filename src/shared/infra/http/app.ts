import "reflect-metadata";
import "dotenv/config"; 
import "express-async-errors";
import express, { NextFunction, Request,Response, } from "express";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import swaggerUi from "swagger-ui-express";
import swaggerJson from "../../../../swagger.json";
import upload from "@config/upload";

import createConnection from "@shared/infra/typeorm";
import "@shared/container";

import { AppError } from "@shared/errors/AppError";

import rateLimiter from "@shared/infra/http/middlewares/rateLimiter";

import { router } from "@shared/infra/http/routes/index.routes";


createConnection(); 
const app = express();
app.use(rateLimiter);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(express.json()); 

app.use("/api/v1/doc-rentx",swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));
app.use(router);

app.use(Sentry.Handlers.errorHandler());

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