import { json, urlencoded, type Application } from "express";
import cookieParser from "cookie-parser"
import cors from "cors";

export default (app: Application) => {
      app.use(cors());
      app.use(urlencoded({extended: true}));
      app.use(json())
      app.use(cookieParser())
};    