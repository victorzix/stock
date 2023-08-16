import { IProduct, ProductInstance, IProductQuery } from '../@types/IProduct';
import { Product } from '../models/Product';
import { generateId } from '../utils/random-bytes';
import {
	IValidUpdate,
	createProductSchema,
	updateProductSchema,
	validateData,
} from '../utils/validators';
import { BadRequestError } from '../errors/BadRequestError';
import { NotFoundError } from '../errors/NotFoundError';
import { FindOptions, Op } from 'sequelize';

class ProductServices {
	async storeProduct(data: IProduct): Promise<ProductInstance> {
		const productCheck = await Product.findOne({ where: { name: data.name } });

		if (productCheck) {
			throw new BadRequestError('Product already exists');
		}

		const id = generateId();
		const total_income = data.quantity * data.price;

		const validation = await validateData<IProduct>(createProductSchema, data);

		if (validation.error) {
			throw new BadRequestError('Validation error: ' + validation.errors);
		}

		const product = await Product.create({
			...validation.data,
			id: id,
			total_income,
		});

		return product;
	}

	async showProduct(params: string): Promise<ProductInstance> {
		const product = await Product.findByPk(params);

		if (!product) {
			throw new NotFoundError('Product not found');
		}
		return product;
	}

	async updateProduct(id: string, params: IProduct): Promise<ProductInstance> {
		const product = await Product.findByPk(id);
		if (!product) {
			throw new NotFoundError('Product not found');
		}

		const priceCalc: number = params.price || product.price;
		const quantityCalc: number = params.quantity || Number(product.quantity);

		const total_income: number = priceCalc * quantityCalc;

		const validation = await validateData<IValidUpdate>(
			updateProductSchema,
			params
		);

		if (validation.error) {
			throw new BadRequestError('Validation error: ' + validation.errors);
		}
		if (validation.data.name) {
			const alreadyExists = await Product.findOne({
				where: { name: validation.data.name },
			});

			if (alreadyExists) {
				throw new BadRequestError('Product Name already registered');
			}
		}
		const productEdited = await product.update({
			...validation.data,
			total_income,
		});

		return productEdited;
	}

	async listProducts(params: IProductQuery): Promise<ProductInstance[]> {
		const query: IProductQuery = {
			name: params.name ? `%${params.name}%` : '',
			price: params.price ? Number(params.price) : undefined,
			sector: params.sector ? `${params.sector}` : '',
		};

		const whereConditions: FindOptions['where'] = {};

		if (query.name) {
			whereConditions.name = {
				[Op.like]: query.name,
			};
		}
		if (query.price) {
			whereConditions.price = {
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

		const listOfProducts = products.map((product: ProductInstance) => {
			return product;
		});

		return listOfProducts;
	}

	async deleteProduct(params: string): Promise<void> {
		const product = await Product.findByPk(params);

		if (!product) {
			throw new NotFoundError('Product not found');
		}

		await product.destroy();

		return;
	}

	async getSectorIncome(query: IProductQuery): Promise<number> {
		if (!query.sector) {
			throw new BadRequestError('Please provide a sector');
		}
		const sector = {
			sector: query.sector ? Number(query.sector) : undefined,
		};

		const products: ProductInstance[] = await Product.findAll({
			where: sector,
		});

		if (products.length < 1) {
			throw new NotFoundError('This sector is not registered');
		}

		const income = products.reduce(
			(acumulator: number, prod: ProductInstance) => {
				return acumulator + Number(prod.total_income);
			},
			0
		);

		return income;
	}
}

export default new ProductServices();
