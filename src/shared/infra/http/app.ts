import "reflect-metadata";
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import swaggerUi  from "swagger-ui-express";
import cors from "cors";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";



import "@shared/container";
import { AppError } from "@errors/AppError";
import upload from "@config/upload";


const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve,swaggerUi.setup(swaggerFile));

app.use("/avatar",express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars",express.static(`${upload.tmpFolder}/cars`));

app.use(cors());
app.use(router);

app.use((err: Error, request: Request, response: Response, next:NextFunction ) => {
  if (err instanceof AppError){
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message
    });    
  }

  return response.status(500).json({
    status: "error",
    message: `Internal server error ${err.message}`
  })
})


export { app };


