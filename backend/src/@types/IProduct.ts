import {
  Model,
  Optional
} from "sequelize";

export interface IProduct {
  id: string;
  name: string;
  price: number;
  product_type: string | undefined;
  sector: string;
  quantity?: number | undefined;
  total_income?: number;
};

export interface IProductQuery {
  name?: string;
  price?: number;
  sector?: string;
}

interface IProductCreation extends Optional<IProduct, 'quantity'> {}

export class ProductInstance extends Model<IProduct, IProductCreation>{
  declare id: string;
  declare name: string;
  declare price: number;
  declare product_type: string | undefined;
  declare sector: string;
  declare quantity?: number | undefined;
  declare total_income?: number | undefined;
}