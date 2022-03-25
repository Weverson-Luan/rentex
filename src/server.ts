import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJson from "../swagger.json";

import "./database";
import { router } from "./routes/index.routes";
const app = express();

app.use(express.json());
app.use(
  "/api/v1/rent-cars-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJson)
);
app.use(router);

app.listen(3333, () => console.log("Start is running !"));
