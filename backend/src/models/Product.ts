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
	product_type: {
		type: DataTypes.STRING,
    allowNull: false,
	},
	sector: {
		type: DataTypes.INTEGER,
    allowNull: false,
	},
	quantity: {
		type: DataTypes.INTEGER,
    allowNull: false,
	},
});
