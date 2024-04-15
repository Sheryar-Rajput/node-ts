import { createOrder } from "../interfaces/order.interface";
import { Customer } from "../models/customer";
import { Order } from "../models/order";
import { Product } from "../models/product";
import { InternalServerError, NotFoundError } from "../utils/exceptions";

async function createOrder(paylaod: createOrder) {
  try {
    const product = await Product.findOne({
      where: {
        id: paylaod.productId,
        activeFlag: true,
      },
    });
    if (!product) {
      throw new NotFoundError("Invalid Product");
    }
    paylaod.total = product.price * paylaod.quantity;
    const result = await Order.create({ ...paylaod });

    return result;
  } catch (error: any) {
    console.log(error);
    throw new InternalServerError(error.message);
  }
}

async function orderDetail(orderId: number) {
  const result = await Order.findOne({
    where: {
      id: orderId,
    },
    include: [
      {
        model: Product,
        as: "product",
        attributes: ["name"],
      },
      {
        model: Customer,
        as: "customer",
        attributes: ["name"],
      },
    ],
  });

  if (!result) {
    throw new NotFoundError("Order Not Found");
  }

  return result;
}

async function ordersDetail(offset?: number, limit?: number) {
  const result = await Order.findAll({
    include: [
      {
        model: Product,
        as: "product",
        attributes: ["name"],
      },
      {
        model: Customer,
        as: "customer",
        attributes: ["name"],
      },
    ],
    limit: limit || 10,
    offset: offset || 0,
  });
  return result;
}

export { createOrder, orderDetail, ordersDetail };
