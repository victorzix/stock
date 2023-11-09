import {
	IProductCreation,
	IProductQuery,
	IUpdateProduct,
	Product,
} from '../@types/product/index';

export interface IProductsRepository {
	create(data: IProductCreation): Promise<Product>;
	update(id: string, data: IUpdateProduct): Promise<Product | null>;
	delete(id: string): Promise<void | null>;
	findOne(query: IProductQuery): Promise<Product | null>;
	findById(id: string): Promise<Product | null>;
	list(query: IProductQuery): Promise<Product[]>;
}
