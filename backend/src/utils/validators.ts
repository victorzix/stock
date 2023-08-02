import Joi from "joi";
import { IProduct } from "../@types/IProduct";

export const validateProducts = (product: IProduct) => {
  const productSchema = Joi.object({
    name: Joi.string().max(30).required(),
    quantity: Joi.number().min(1).max(1000).required(),
    price: Joi.number().min(1).max(1000).required(),
    sector: Joi.number().min(1).max(120).required()
  })

  return productSchema.validate(product)
}
