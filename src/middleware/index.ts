import { json, urlencoded, type Application } from "express";
import { globalErrorHandler } from "./error.middleware";

export default (app: Application) => {
      app.use(urlencoded({extended: true}));
      app.use(json())


      app.use(globalErrorHandler)
};    