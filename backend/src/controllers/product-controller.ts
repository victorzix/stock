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
			total: Number(quantity) * Number(price),
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
				price: `${price}R$`,
				product_type: product_type,
				sector: sector,
				quantity: quantity,
				total: `${productData.total}R$`,
			});
		} catch (err: any) {
			console.log(err.message);
		}
	}

}

export default new ProductController();
