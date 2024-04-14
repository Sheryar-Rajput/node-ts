import { Request, Response } from "express";
import {
  createCustomer,
  getAllCustomer,
  getCustomerById,
  updateCustomer,
} from "../services/customer.service";

const customerCreate = (req: Request, res: Response): any => {
  return createCustomer(req.body);
};
const customerUpdate = (req: Request, res: Response): any => {
  return updateCustomer(req.body);
};

const getCustomer = (req: Request, res: Response): any => {
  const customerId = Number(req.params.customerId);
  return getCustomerById(customerId);
};

const getCustomers = (req: Request, res: Response): any => {
  const offset = Number(req.query.offset);
  const limit = Number(req.query.limit);
  return getAllCustomer(limit, offset);
};

export { customerCreate, customerUpdate, getCustomer, getCustomers };
