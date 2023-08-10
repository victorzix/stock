import { IProduct, ProductInstance } from '../@types/IProduct';
import { Product } from '../models/Product';
import { generateId } from '../utils/random-bytes';
import { createProductSchema, validateData } from '../utils/validators';
import { BadRequestError } from '../errors/BadRequestError';

class StoreProductService {
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
}

export default new StoreProductService();
