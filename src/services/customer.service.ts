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
        isActive: true,
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
    const result = await Customer.findOne({
      where: {
        id: customerId,
        isActive: true,
      },
    });
    if (!result) {
      throw new NotFoundError("Customer Not Found");
    }
    return result;
  } catch (error: any) {
    throw new InternalServerError(error.message);
  }
}

async function getAllCustomer(limit?: number, offset?: number) {
  const result = await Customer.findAndCountAll({
    where: {
      isActive: true,
    },
    limit: limit || 10,
    offset: offset || 0,
  });

  return {
    total: result.count,
    result: result.rows,
  };
}

export { createCustomer, updateCustomer, getAllCustomer, getCustomerById };
