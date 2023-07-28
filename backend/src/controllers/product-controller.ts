import { IProduct, IProductQuery, ProductInstance } from "../@types/IProduct";
import { Product } from "../models/Product";
import { Request, Response } from "express";
import { generateId } from "../utils/random-bytes";
import { Op, FindOptions } from "sequelize";

class ProductController {
  async store(req: Request, res: Response): Promise<Response> {
    const id = generateId();
    const { name, price, product_type, sector, quantity } = req.body;

    const productData: IProduct = {
      id,
      name,
      price,
      product_type,
      sector,
      quantity,
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
        msg: ["Successfuly added"],
        product: {
          product_id: id,
          name: name,
          price: price,
          product_type: product_type,
          sector: sector,
          quantity: quantity,
          total_income: productData.total_income,
        },
      });
    } catch (err: any) {
      return res.status(400).json({
				msg: [err.message]
			})
    }
  }

  async show(req: Request, res: Response): Promise<Response> {
    try {
      const product = await Product.findByPk(req.params.id);

      if (!product) {
        return res.status(400).json({ msg: ["Product not found"] });
      }

      return res.status(200).json({ product: [product] });
    } catch (err: any) {
      return res.status(400).json({
				msg: [err.message]
			})
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const product = await Product.findByPk(req.params.id);

      if (!product) {
        return res.status(400).json({ msg: ["Product not found"] });
      }

      const priceCalc: number = req.body.price || product.price;
      const quantityCalc: number = req.body.quantity || product.quantity;

      const total_income: number = priceCalc * quantityCalc;

      const productEdited = await product.update({ ...req.body, total_income });
      const { name, price, product_type, sector, quantity } = productEdited;

      return res.status(200).json({
        msg: ["Updated successfully"],
        product: {
          name,
          price,
          product_type,
          sector,
          quantity,
          total_income,
        },
      });
    } catch (err: any) {
      return res.status(400).json({
				msg: [err.message]
			})
    }
  }

  async index(req: Request, res: Response): Promise<Response> {
		try {
			const query: IProductQuery = {
				name: req.query.name ? `%${req.query.name}%` : "",
				price: req.query.price ? Number(req.query.price) : undefined,
				sector: req.query.sector ? `${req.query.sector}` : "",
			};
	
			const whereConditions: FindOptions["where"] = {};
	
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
					product: {
						name,
						id,
						total_income,
						quantity,
						price,
						sector,
					},
				};
			});
	
			return res.status(200).json({
				products: {
					listOfProducts: listOfProducts,
				},
			});
		} catch (err: any) {
			return res.status(400).json({
				msg: [err.message]
			})
		}
    
  }
}

export default new ProductController();
