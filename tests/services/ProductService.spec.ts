import { ICreateProduct } from '../../src/@types/product/index';
import { ProductRepository } from '../../src/repositories/ProductRepository';
import { ProductServices } from '../../src/services/ProductServices';
import { jest } from '@jest/globals';
import { generateId } from '../../src/utils/generate-id';

jest.mock('sequelize');

describe('ProductService', () => {
	let productService: ProductServices;

	beforeEach(() => {
		productService = new ProductServices();
	});

	it('should be able to create a product', async () => {
		const data: ICreateProduct = {
			name: 'Product Test',
			price: 1.99,
			quantity: 100,
			sector: '3',
		};

		const repositorySpy = jest
			.spyOn(ProductRepository.prototype, 'create')
			.mockImplementationOnce(async (data) => {
				return {
					...data,
					id: generateId(),
					total_income: data.price * data.quantity,
				};
			});

		jest
			.spyOn(ProductRepository.prototype, 'findOne')
			.mockImplementationOnce(async () => null);

		const product = await productService.storeProduct(data);
		expect(repositorySpy).toHaveBeenCalledTimes(1);
		expect(product.name).toEqual(data.name);
		expect(product).toHaveProperty('id');
	});

});
