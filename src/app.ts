import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import expressSession from "express-session";
import passport from "passport";
import { envVars } from "./app/config/env";
import "./app/config/passport";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import routes from "./app/routes/routes";
export const app = express();

//middleware

app.use(
  expressSession({
    secret: envVars.FRONTEND_URL,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);
// app.use(
//   cors({
//     origin: [envVars.FRONTEND_URL],
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: [
      envVars.FRONTEND_URL,
      "https://client-n6ksm5skg-mahabub2030s-projects.vercel.app",
      "https://wallet-client-djrc.vercel.app",
      "http://localhost:5173", // for local dev (Vite)
      "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
//routes
app.use("/api/v1", routes);

app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "Welcome to the Digital Wallet Server",
  });
});

app.use(globalErrorHandler);
app.use(notFound);
