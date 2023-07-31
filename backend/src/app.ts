// Imports
import express, { Express, Request, Response } from "express";
import { router } from "./routes/index";

// Variables declarations
const app = express();

//app uses
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app Routes
app.use(router);

export default app;
