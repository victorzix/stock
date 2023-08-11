import { IProduct, IProductQuery, ProductInstance } from '../@types/IProduct';
import { Product } from '../models/Product';
import { NextFunction, Request, Response } from 'express';
import { Op, FindOptions } from 'sequelize';
import {
	IValidUpdate,
	updateProductSchema,
	validateData,
} from '../utils/validators';
import ProductServices from '../services/ProductServices';
('./store-product-service');
import { NotFoundError } from '../errors/NotFoundError';
import { BadRequestError } from '../errors/BadRequestError';

class ProductController {
	async store(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> {
		try {
			const data: IProduct = req.body;
			const product: ProductInstance = await ProductServices.storeProduct(data);

			return res.status(201).json({
				message: 'Product successfully created',
				data: product,
			});
		} catch (err) {
			return next(err);
		}
	}

	async show(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> {
		try {
			const product = await ProductServices.showProduct(req.params.id);
			res.status(200).json(product);
		} catch (err) {
			return next(err);
		}
	}

	async update(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> {
		try {
			const update = await ProductServices.updateProduct(
				req.params.id,
				req.body
			);
			return res.status(200).json({
				message: 'Successfully updated product',
				update,
			});
		} catch (err) {
			next(err);
		}
	}

	async index(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> {
		try {
			const query: IProductQuery = req.query;
			const listOfProducts = await ProductServices.index(query);

			res.status(200).json(listOfProducts);
		} catch (err: any) {
			next(err);
		}
	}

	async delete(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> {
		try {
			const product = await Product.findByPk(req.params.id);

			if (!product) {
				next(new NotFoundError('Product not found'));
				return;
			}

			await product.destroy();

			return res.status(204).json('Successfully deleted');
		} catch (err: any) {
			next(new BadRequestError(err.message));
			return;
		}
	}

	async getIncomes(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> {
		try {
			if (!req.query.sector) {
				next(new NotFoundError('Please provide a sector'));
				return;
			}
			const sector = {
				sector: req.query.sector ? Number(req.query.sector) : undefined,
			};

			const products: ProductInstance[] = await Product.findAll({
				where: sector,
			});

			if (products.length < 1) {
				next(new BadRequestError('This sector is not registered'));
				return;
			}

			const income = products.reduce(
				(acumulator: number, prod: ProductInstance) => {
					return acumulator + Number(prod.total_income);
				},
				0
			);

			return res.status(200).json(income);
		} catch (err: any) {
			next(new BadRequestError(err.message));
			return;
		}
	}
}

export default new ProductController();
