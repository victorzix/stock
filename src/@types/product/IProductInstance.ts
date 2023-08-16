import { Model } from "sequelize-typescript";
import IProduct  from "./IProduct";
import IProductCreation  from "./IProductCreation";

export default class ProductInstance extends Model<IProduct & IProductCreation, IProductCreation>{
  declare id: string;
  declare name: string;
  declare price: number;
  declare sector: string;
  declare quantity?: number | undefined;
  declare total_income?: number | undefined;
}
