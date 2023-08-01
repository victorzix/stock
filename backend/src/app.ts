// Imports
import express from "express";
import { router } from "./routes/index";
import cors from 'cors'

// Variables declarations
const app = express();

//app uses
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

// app Routes
app.use(router);

export default app;
