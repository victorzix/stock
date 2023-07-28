import {
  Model,
  Optional
} from "sequelize";
interface IProduct {
  id: {};
  name: string;
  price: number;
  product_type: string | undefined;
  sector: string;
  quantity?: number | undefined;
};

interface IProductCreation extends Optional<IProduct, 'id'> {}

export class ProductInstance extends Model<IProduct, IProductCreation>{
  declare id: string;
  declare name: string;
  declare price: number;
  declare product_type: string | undefined;
  declare sector: string;
  declare quantity?: number | undefined;
}