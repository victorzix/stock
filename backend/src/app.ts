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
app.use(router);
app.use(errorHandler)
app.use((req, res) => {
  res.status(404).json({
    statusCode: 404,
    message: "Please send at least one parameter"
  })
})

export default app;
