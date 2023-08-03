import { IProduct, IProductQuery, ProductInstance } from '../@types/IProduct';
import { Product } from '../models/Product';
import { Request, Response } from 'express';
import { generateId } from '../utils/random-bytes';
import { Op, FindOptions } from 'sequelize';
import { productSchema, IValidProduct } from '../utils/validators';

class ProductController {
	async store(req: Request, res: Response): Promise<Response> {
		const id = generateId();
		const { name, price, sector, quantity } = req.body;
		const productData: IProduct = {
			id,
			name,
			price,
			sector,
			quantity,
			total_income: Number(quantity) * Number(price),
		};

		try {
			const productCheck = await Product.findOne({ where: { name: name } });
			if (productCheck) {
				return res.status(400).json(`${name} has already been registered`);
			}

			const validProduct: IValidProduct = await productSchema.validate(
				productData
			);

			const product = await Product.create(validProduct);

			return res.status(201).json({
				message: 'Successfully created product',
				id,
				name,
				price,
				sector,
				quantity,
				total_income: productData.total_income,
			});
		} catch (err: any) {
			return res.status(400).json(err.message);
		}
	}

	async show(req: Request, res: Response): Promise<Response> {
		try {
			const product = await Product.findByPk(req.params.id);

			if (!product) {
				return res.status(400).json('Product not found');
			}

			return res.status(200).json(product);
		} catch (err: any) {
			return res.status(400).json(err.message);
		}
	}

	async update(req: Request, res: Response): Promise<Response> {
		try {
			const product = await Product.findByPk(req.params.id);
			if (!product) {
				return res.status(400).json('Product not found');
			}

			const priceCalc: number = req.body.price || product.price;
			const quantityCalc: number = req.body.quantity || product.quantity;

			const total_income: number = priceCalc * quantityCalc;

			const productEdited = await product.update({ ...req.body, total_income });
			const { name, price, sector, quantity } = productEdited;
			const newProduct = {
				name,
				price,
				sector,
				quantity,
				total_income,
			};
			return res.status(200).json({
				message: 'Updated successfully',
				newProduct,
			});
		} catch (err: any) {
			return res.status(400).json(err.message);
		}
	}

	async index(req: Request, res: Response): Promise<Response> {
		try {
			const query: IProductQuery = {
				name: req.query.name ? `%${req.query.name}%` : '',
				price: req.query.price ? Number(req.query.price) : undefined,
				sector: req.query.sector ? `${req.query.sector}` : '',
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

			const listOfProducts = products.map((product: IProduct) => {
				const { id, name, total_income, quantity, price, sector } = product;
				return {
					name,
					id,
					total_income,
					quantity,
					price,
					sector,
				};
			});

			return res.status(200).json(listOfProducts);
		} catch (err: any) {
			return res.status(400).json(err.message);
		}
	}

	async delete(req: Request, res: Response): Promise<Response> {
		try {
			const product = await Product.findByPk(req.params.id);

			if (!product) {
				return res.status(400).json('Product not found');
			}

			await product.destroy();

			return res.status(204).json('Successfully deleted');
		} catch (err: any) {
			return res.status(400).json(err.message);
		}
	}

	async getIncomes(req: Request, res: Response): Promise<Response> {
		try {
			const sector = {
				sector: req.query.sector ? Number(req.query.sector) : undefined,
			};

			const products: ProductInstance[] = await Product.findAll({
				where: sector,
			});

			const income = products.reduce(
				(acumulator: number, prod: ProductInstance) => {
					return acumulator + Number(prod.total_income);
				},
				0
			);

			return res.status(200).json(income);
		} catch (err: any) {
			return res.status(404).json(err.message);
		}
	}
}

export default new ProductController();
