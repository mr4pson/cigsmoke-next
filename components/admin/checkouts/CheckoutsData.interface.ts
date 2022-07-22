import { OrderProduct } from "swagger/services";

export interface CheckoutsData {
  key: string;
  id: string;
  addressName: string;
  payment: string;
  orderedProducts: OrderProduct;
}