import { FindOptions } from 'sequelize';
import {
	IProductCreation,
	IProductQuery,
	IUpdateProduct,
	Product,
	ProductModelDefinition,
} from '../@types/product/index';
import { ProductModel } from '../models/Product';
import { IProductsRepository } from './IProductsRepository';
import { Op } from 'sequelize';

export class ProductRepository implements IProductsRepository {
	async create(data: IProductCreation): Promise<Product> {
		const product = await ProductModel.create(data);
		return product.dataValues;
	}

	async update(
		id: string,
		data: IUpdateProduct
	): Promise<Product | null> {
		const product = await ProductModel.findByPk(id);
		if (!product) return null;

		const updated = await product.update({
			...data,
		});

		return updated.dataValues;
	}

	async delete(id: string): Promise<void | null> {
		const product = await ProductModel.findByPk(id);
		if (!product) return null;

		await product.destroy();
		return;
	}

	async findOne(query: IProductQuery): Promise<Product | null> {
		const product = await ProductModel.findOne({
			where: {
				...query,
			},
		});
		return product?.dataValues || null;
	}

	async findById(id: string): Promise<Product | null> {
		const product = await ProductModel.findByPk(id);
		return product?.dataValues || null;
	}

	async list(userQuery: IProductQuery): Promise<Product[]> {
		const query: IProductQuery = {
			name: userQuery.name ? `%${userQuery.name}%` : '',
			price: userQuery.price ? Number(userQuery.price) : undefined,
			sector: userQuery.sector ? `%${userQuery.sector}%` : '',
		};

		const whereConditions: FindOptions['where'] = {};

		if (query.name) {
			whereConditions.name = {
				[Op.like]: query.name,
			};
		}
		if (query.price) {
			whereConditions.name = {
				[Op.lte]: query.price,
			};
		}
		if (query.sector) {
			whereConditions.sector = {
				[Op.like]: query.sector,
			};
		}

		const products = await ProductModel.findAll({
			where: whereConditions,
		});

		const productsData = products.map(p => p.dataValues)

		return productsData;
	}
}

export default new ProductRepository();
