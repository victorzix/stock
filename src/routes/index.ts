import { Router } from "express";
import productRouter from "./product-routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "../swagger/swagger.json";

const router = Router();

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
router.use("/products", productRouter);

export { router };
