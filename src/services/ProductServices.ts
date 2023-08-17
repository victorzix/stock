import {
	Product,
	IProductQuery,
	IUpdateProduct,
	IProductCreation,
	ICreateProduct,
} from '../@types/product/index';
import { generateId } from '../utils/random-bytes';
import {
	IValidUpdate,
	createProductSchema,
	updateProductSchema,
	validateData,
} from '../utils/validators';
import { BadRequestError } from '../errors/BadRequestError';
import { NotFoundError } from '../errors/NotFoundError';
import ProductRepository from '../repositories/ProductRepository';

export class ProductServices {
	async storeProduct(data: ICreateProduct): Promise<Product> {
		const productCheck = await ProductRepository.findOne({ name: data.name });

		if (productCheck) {
			throw new BadRequestError('Product already exists');
		}

		const id = generateId();
		const total_income = data.quantity * data.price;

		const validation = await validateData<Product>(createProductSchema, {
			...data,
			id,
			total_income,
		});

		if (validation.error) {
			throw new BadRequestError('Validation error: ' + validation.errors);
		}

		const product = await ProductRepository.create({
			...validation.data,
			id: id,
			total_income,
		});

		return product;
	}

	async showProduct(id: string): Promise<Product> {
		const product = await ProductRepository.findById(id);

		if (!product) {
			throw new NotFoundError('Product not found');
		}
		return product;
	}

	async updateProduct(id: string, data: IUpdateProduct): Promise<Product> {
		const product = await ProductRepository.findById(id);

		if (!product) {
			throw new NotFoundError('Product not found');
		}

		const priceCalc: number = data.price || product.price;
		const quantityCalc: number = data.quantity || Number(product.quantity);

		const total_income: number = priceCalc * quantityCalc;

		const validation = await validateData<IValidUpdate>(
			updateProductSchema,
			data
		);

		if (validation.error) {
			throw new BadRequestError('Validation error: ' + validation.errors);
		}
		if (validation.data.name) {
			const alreadyExists = await ProductRepository.findOne({
				name: validation.data.name,
			});

			if (alreadyExists) {
				throw new BadRequestError('Product Name already registered');
			}
		}
		const productEdited = await ProductRepository.update(id, {
			...validation.data,
			total_income,
		});

		return productEdited!;
	}

	async listProducts(query: IProductQuery): Promise<Product[]> {
		const products = await ProductRepository.list(query);

		const listOfProducts = products.map((product: Product) => {
			return product;
		});
		return listOfProducts;
	}

	async deleteProduct(id: string): Promise<void> {
		const product = await ProductRepository.findById(id);

		if (!product) {
			throw new NotFoundError('Product not found');
		}

		return;
	}

	async getSectorIncome(query: IProductQuery): Promise<number> {
		const products = await ProductRepository.list(query);

		if (!query.sector) {
			throw new BadRequestError('Please provide a sector');
		}

		if (products.length < 1) {
			throw new NotFoundError('This sector is not registered');
		}

		const income = products.reduce((acumulator: number, prod: Product) => {
			return acumulator + Number(prod.total_income);
		}, 0);

		return income;
	}
}

export default new ProductServices();
