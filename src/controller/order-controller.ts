import { Request } from "express";
import {
  createOrder,
  orderDetail,
  ordersDetail,
} from "../services/order.service";
import { OrderResponse } from "../interfaces/order.interface";
const orderCreate = (req: Request): Promise<OrderResponse> => {
  return createOrder(req.body);
};

const getOrderDetail = (req: Request): Promise<OrderResponse> => {
  const orderId = Number(req.params.orderId);
  return orderDetail(orderId);
};

const getOrdersDetail = (req: Request): Promise<OrderResponse[]> => {
  const limit = Number(req.query.limit);
  const offset = Number(req.query.offset);
  return ordersDetail(offset, limit);
};

export { orderCreate, getOrderDetail, getOrdersDetail };
