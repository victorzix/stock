import { Model } from "sequelize-typescript";
import IProductCreation  from "./IProductCreation";
import ICreateProduct from "./ICreateProduct";

export default class ProductModelDefinition extends Model<ICreateProduct & IProductCreation, IProductCreation>{
  declare id: string;
  declare name: string;
  declare price: number;
  declare sector: string;
  declare quantity?: number | undefined;
  declare total_income?: number | undefined;
}
