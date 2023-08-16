import { FindOptions } from 'sequelize';
import {
	IProductCreation,
	IProductQuery,
	IUpdateProduct,
	ProductInstance,
} from '../@types/IProduct';
import { Product } from '../models/Product';
import { IProductsRepository } from './IProductsRepository';
import { Op } from 'sequelize';

export class ProductRepository implements IProductsRepository {
	async create(data: IProductCreation): Promise<ProductInstance> {
		const product = await Product.create(data);
		return product;
	}

	async update(
		id: string,
		data: IUpdateProduct
	): Promise<ProductInstance | null> {
		const product = await Product.findByPk(id);
		if (!product) return null;

		const updated = await product.update({
			...data,
		});

		return updated;
	}

	async delete(id: string): Promise<void | null> {
		const product = await Product.findByPk(id);
		if (!product) return null;

		await product.destroy();
		return;
	}

	async findOne(query: IProductQuery): Promise<ProductInstance | null> {
		const product = await Product.findOne({
			where: {
				...query,
			},
		});
		return product;
	}

	async findById(id: string): Promise<ProductInstance | null> {
		const product = await Product.findByPk(id);
		return product;
	}

	async list(userQuery: IProductQuery): Promise<ProductInstance[]> {
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

		const products = await Product.findAll({
			where: whereConditions,
		});

		return products;
	}
}

export default new ProductRepository();
