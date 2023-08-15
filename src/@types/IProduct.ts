import {
  Model,
  Optional
} from "sequelize";

export interface IProduct {
  name: string;
  price: number;
  sector: string;
  quantity: number;
  total_income?: number;
};

export interface IProductQuery {
  name?: string;
  price?: number;
  sector?: string;
}

interface IProductCreation extends Optional<IProduct, 'quantity'> {
  id: string
}

export class ProductInstance extends Model<IProduct & {id: string}, IProductCreation>{
  declare id: string;
  declare name: string;
  declare price: number;
  declare sector: string;
  declare quantity?: number | undefined;
  declare total_income?: number | undefined;
}