import { Request } from "express";
import {
  createCustomer,
  getAllCustomer,
  getCustomerById,
  updateCustomer,
} from "../services/customer.service";
import { CustomerResponse } from "../interfaces/customer.interface";

async function customerCreate(req: Request): Promise<CustomerResponse> {
  return createCustomer(req.body);
}
async function customerUpdate(req: Request): Promise<CustomerResponse> {
  return updateCustomer(req.body);
}

async function getCustomer(req: Request): Promise<CustomerResponse> {
  const customerId = Number(req.params.customerId);
  return getCustomerById(customerId);
}

async function getCustomers(
  req: Request
): Promise<{ total: number; result: CustomerResponse[] }> {
  const offset = Number(req.query.offset);
  const limit = Number(req.query.limit);
  return getAllCustomer(limit, offset);
}

export { customerCreate, customerUpdate, getCustomer, getCustomers };
