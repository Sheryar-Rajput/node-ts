import { createOrder } from "../interfaces/order.interface";
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

async function orderDetail() {
  const result = await Order.findAll({
    include: {
      model: Product,
      as: "product",
    },
  });
  return result;
}
export { createOrder, orderDetail };
