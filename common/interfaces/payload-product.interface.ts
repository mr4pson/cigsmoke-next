import { ParameterProductsDTO } from 'swagger/services';

export interface PayloadProduct {
  name: string;
  price: number;
  available: boolean;
  colors: string[] | [];
  category: string;
  brand: string;
  parameterProducts: ParameterProductsDTO[];
  url: string;
  desc?: string;
  images?: string;
  tags?: string[];
  id?: string | string[] | undefined;
}
