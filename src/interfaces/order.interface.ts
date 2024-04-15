import { CustomerResponse } from "./customer.interface";
import { ProductResponse } from "./product.interface";

export interface createOrder {
  customerId: number;
  productId: number;
  quantity: number;
  total?: number;
}

export interface OrderResponse {
  id?: number;
  customerId?: number;
  productId?: number;
  quantity?: number;
  total?: number;
  product?: ProductResponse;
  customer?: CustomerResponse;
}
