import {
	object,
	string,
	number,
	ObjectSchema,
	setLocale,
	AnyObjectSchema,
} from 'yup';
import { IProduct } from '../@types/IProduct';

export interface IValidProduct {
	id: string;
	name: string;
	quantity: number;
	price: number;
	sector: string;
}

export interface IValidUpdate extends Partial<Omit<IValidProduct, 'id'>> {}

setLocale({
	mixed: {
		default: 'Product is invalid',
	},
	number: {
		min: ({ path }) => `${path} Must have more than 1`,
	},
	string: {
		min: 'Please insert at least one character',
		max: ({ path, max }) => `${path} Cannot be more than ${max}`,
	},
});

export const createProductSchema: ObjectSchema<IValidProduct> = object({
	id: string().required(),
	name: string().min(1).max(60).required(),
	quantity: number().min(1).max(5000).required(),
	price: number().min(1).max(10000).required(),
	sector: string()
		.min(0)
		.max(3)
		.required()
		.matches(/^\d+$/, 'Please enter only numbers'),
})

export const updateProductSchema: ObjectSchema<IValidUpdate> = object({
	name: string().min(1).max(60),
	quantity: number().min(1).max(5000),
	price: number().min(1).max(10000),
	sector: string()
		.min(0)
		.max(3)
		.matches(/^\d{1,3}$/, 'Please enter only numbers'),
});

export async function validateData(
	schema: AnyObjectSchema,
	productData: IProduct,
): Promise<IValidProduct | string> {
	try {
		const data = await schema.validate(productData);
		return data;
	} catch (err: any) {
    const msg: string = err.message
		return msg;
	}
}
