export interface IProduct {
  id: string;
  name: string;
  price: number;
  type: string | null;
  sector: string;
  quantity?: number;
};