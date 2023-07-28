import { IProduct } from '../@types/IProduct';
import { Product } from '../models/Product';
import { Request, Response } from 'express';
import { generateId } from '../utils/random-bytes';

class ProductController {
	async store(req: Request, res: Response): Promise<void | Response> {
		const id = generateId();
		const { name, price, product_type, sector, quantity } = req.body;

		const productData: IProduct = {
			id: id,
			name: name,
			price: price,
			product_type: product_type,
			sector: sector,
			quantity: quantity,
			total_income: Number(quantity) * Number(price),
		};

		try {
			const productCheck = await Product.findAll({ where: { name: name } });
			if (productCheck.length > 0) {
				return res
					.status(400)
					.json({ msg: [`${name} has already been registered`] });
			}

			const product = await Product.create(productData);

			return res.status(201).json({
				product_id: id,
				name: name,
				price: price,
				product_type: product_type,
				sector: sector,
				quantity: quantity,
				total_income: productData.total_income,
			});
		} catch (err: any) {
			console.log(err.message);
		}
	}

	async show(req: Request, res: Response): Promise<void | Response> {
		const product = await Product.findByPk(req.params.id);

		if (!product) {
			return res.status(400).json({ msg: ['Product not found'] });
		}

		return res.status(200).json({ product: [product] });
	}

	async update(req: Request, res: Response): Promise<void | Response> {
		const product = await Product.findByPk(req.params.id);

		if (!product) {
			return res.status(400).json({ msg: ['Product not found'] });
		}

		const productEdited = await product.update(req.body);
		const { name, price, product_type, sector, quantity } = productEdited;
    
		await product.update({
			total_income: (productEdited.total_income = price * Number(quantity)),
		});

		return res.status(200).json({
			msg: ['Updated successfully'],
			product: {
				name: name,
				price: price,
				product_type: product_type,
				sector: sector,
			},
		});
	}
}

export default new ProductController();
