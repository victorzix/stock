import { v4 as uuidv4 } from 'uuid';
import { IProduct } from '../@types/IProduct'
import { Product } from '../models/Product'
import { Request, Response } from 'express';

const randomId: string[] = uuidv4().split('-');

class ProductController  {
  async store(req: Request, res: Response): Promise<void | IProduct>{
    const id = randomId;
    const { name, price, product_type, sector } = req.body;
    
    const productData: IProduct = {
      id: id,
      name: name,
      price: price,
      product_type: product_type,
      sector: sector,
    }

    try {
      const product = await Product.create(productData)
      res.status(200).json({ product_id: id, name: name, price: price, product_type: product_type, sector: sector});
      return product
    } catch (err: any) {
      console.log(err.message)
    }
    
  }
}