import { object, string, number, ObjectSchema, setLocale } from 'yup'

export interface IValidProduct {
  id: string;
  name: string;
  quantity: number;
  price: number;
  sector: string;
}

setLocale({
  mixed: {
    default: 'Product is invalid',
  },
  number: {
    min: ({path}) => `${path} Must have more than 1`
  },
  string: {
     min: "Please insert at least one character",
     max: ({path, max}) => `${path} Cannot be more than ${max}`
  }
})

export const productSchema: ObjectSchema<IValidProduct> = object({
  id: string().required(),
  name: string().min(1).max(60).required(),
  quantity: number().min(1).max(5000).required(),
  price: number().min(1).max(10000).required(),
  sector: string().min(0).max(3).required(),
})


