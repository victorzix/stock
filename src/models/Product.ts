import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db';
import { ProductInstance } from '../@types/IProduct';


export const Product = sequelize.define<ProductInstance>('Product', {
	id: {
    type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true,
	},
	name: {
    type: DataTypes.STRING,
		allowNull: false,
	},
	price: {
		type: DataTypes.FLOAT,
		defaultValue: '00.00',
	},
	sector: {
		type: DataTypes.STRING,
    allowNull: false,
	},
	quantity: {
		type: DataTypes.INTEGER,
    allowNull: false,
	},
  total_income: {
    type: DataTypes.FLOAT,
  }
});
