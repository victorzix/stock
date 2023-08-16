import {
	IProductCreation,
	IProductQuery,
	IUpdateProduct,
	ProductInstance,
} from '../@types/product/index';

export interface IProductsRepository {
	create(data: IProductCreation): Promise<ProductInstance>;
	update(id: string, data: IUpdateProduct): Promise<ProductInstance | null>;
	delete(id: string): Promise<void | null>;
	findOne(query: IProductQuery): Promise<ProductInstance | null>;
	findById(id: string): Promise<ProductInstance | null>;
	list(query: IProductQuery): Promise<ProductInstance[]>;
}
