import ICreateProduct from "./ICreateProduct";

export default interface IProductCreation extends ICreateProduct{
  id: string;
  total_income: number;
}
