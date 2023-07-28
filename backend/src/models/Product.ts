import {
  DataTypes,
  Model,
  Optional
} from "sequelize";
import { sequelize } from "../database/db";
import { v4 as uuidv4 } from "uuid";
import { ProductInstance } from "../@types/IProduct";
const randomId: string[] = uuidv4().split("-");


export const Product = sequelize.define<ProductInstance>('Product', {
  id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.STRING,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.FLOAT,
    defaultValue: '00.00'
  },
  product_type: {
    type: DataTypes.STRING,
  },
  sector: {
    type: DataTypes.INTEGER
  },
  quantity: {
    type: DataTypes.INTEGER
  }
})
