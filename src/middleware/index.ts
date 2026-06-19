import { json, type Application } from "express";
import cookieParser from "cookie-parser"
import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173",
  "https://your-production-domain.com",
];

export default (app: Application) => {
      // app.use(cors());
      // app.use(urlencoded({extended: true}));
      // app.use(
      //       cors({
      //             origin: function (origin, callback) {
      //                   if (!origin || allowedOrigins.includes(origin)) {
      //                         callback(null, true);
      //                   } else {
      //                         callback(new Error("Not allowed by CORS"));
      //                   }
      //             },
      //             credentials: true,
      //       })
      // );
      app.use(
        cors({
          origin: "http://localhost:5173", // EXACT frontend URL
          credentials: true,
        })
      )
      app.use(json())
      app.use(cookieParser())
};    