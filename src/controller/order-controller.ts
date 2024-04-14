import { Request, Response } from "express";
import { createOrder, orderDetail } from "../services/order.service";
const orderCreate = (req: Request, res: Response): any => {
  return createOrder(req.body);
};
const orderUpdate = (req: Request, res: Response) => {
  return;
};

const getOrderDetail = (req: Request): any => {
  return orderDetail();
};

export { orderCreate, orderUpdate, getOrderDetail };
