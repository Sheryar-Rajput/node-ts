import { Customer } from "../models/customer";
import {} from "express";
import {
  CustomerCreate,
  CustomerUpdate,
} from "../interfaces/customer.interface";
import { InternalServerError, NotFoundError } from "../utils/exceptions";
async function createCustomer(payload: CustomerCreate) {
  try {
    const result = await Customer.create({ ...payload });
    return result;
  } catch (error: any) {
    throw new InternalServerError(error.message);
  }
}

async function updateCustomer(payload: CustomerUpdate) {
  try {
    const result = await Customer.findOne({
      where: {
        id: payload.id,
      },
    });
    if (!result) {
      return new NotFoundError("Customer not found");
    }
    result.dataValues = { ...result.dataValues, ...payload };
    return await result.save();
  } catch (error: any) {
    throw new InternalServerError(error.message);
  }
}

async function getCustomerById(customerId: number) {
  try {
    const result = Customer.findOne({
      where: {
        id: customerId,
      },
    });
    return result;
  } catch (error: any) {
    throw new InternalServerError(error.message);
  }
}

async function getAllCustomer() {
  const result = Customer.findAll({});
  return result;
}

export { createCustomer, updateCustomer, getAllCustomer, getCustomerById };
