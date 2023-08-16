import {
  Model,
  Optional
} from "sequelize";

export interface IProduct {
  name: string;
  price: number;
  sector: string;
  quantity: number;

};

export interface IProductQuery {
  name?: string;
  price?: number;
  sector?: string;
}

export interface IProductCreation extends IProduct{
  id: string;
  total_income: number;
}

export class ProductInstance extends Model<IProduct & IProductCreation, IProductCreation>{
  declare id: string;
  declare name: string;
  declare price: number;
  declare sector: string;
  declare quantity?: number | undefined;
  declare total_income?: number | undefined;
}