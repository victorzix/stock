import { ICreateProduct, IProductQuery, IUpdateProduct, Product } from '../@types/product/index';
import { NextFunction, Request, Response } from 'express';
import ProductServices from '../services/ProductServices';
('./store-product-service');


class ProductController {
	async store(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> {
		try {
			const data: ICreateProduct = req.body;
			const product: Product = await ProductServices.storeProduct(data);

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
			const update: IUpdateProduct = await ProductServices.updateProduct(
				req.params.id,
				req.body
			);
			return res.status(200).json({
				message: 'Successfully updated product',
				update,
			});
		} catch (err) {
			return next(err);
		}
	}

	async index(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> {
		try {
			const query: IProductQuery = req.query;
			const listOfProducts = await ProductServices.listProducts(query);

			res.status(200).json({products: listOfProducts});
		} catch (err: any) {
			next(err);
			return;
		}
	}

	async delete(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> {
		try {
			await ProductServices.deleteProduct(req.params.id);
			return res.status(204).json("OK");
		} catch (err: any) {
			return next(err);
		}
	}

	async getIncomes(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | void> {
		try {
			const income = await ProductServices.getSectorIncome(req.query);
			return res.status(200).json({
				sector: req.query.sector,
				total_income: income
			});
		} catch (err: any) {
			return next(err);
		}
	}
}

export default new ProductController();
