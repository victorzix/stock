import { IProduct, ProductInstance } from '../@types/IProduct';
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

	async showProduct(params: string): Promise<ProductInstance | void> {
		const product = await Product.findByPk(params);

		if (!product) {
			throw new NotFoundError('Product not found');
		}
		return product;
	}

	async updateProduct(id: string, params: IProduct) {
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
}

export default new ProductServices();
