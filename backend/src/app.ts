// Imports
import express from "express";
import { router } from "./routes/index";
import cors from 'cors'
import { errorHandler } from "./middlewares/errorHandler";

// Variables declarations
const app = express();

//app uses
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(errorHandler)
// app Routes
app.use(router);

export default app;
