import IProduct from "./IProduct";

export default interface IProductCreation extends IProduct{
  id: string;
  total_income: number;
}
