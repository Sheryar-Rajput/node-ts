import { ProductCreate, ProductUpdate } from "../interfaces/product.interface";
import { Product } from "../models/product";
import { InternalServerError, NotFoundError } from "../utils/exceptions";
import { Order } from "../models/order";
import db from "../config/db";

async function createProduct(payload: ProductCreate) {
  try {
    const result = await Product.create({ ...payload });
    return result;
  } catch (error: any) {
    throw new InternalServerError(error.message);
  }
}

async function updateProduct(payload: ProductUpdate) {
  try {
    const result = await Product.findOne({
      where: {
        id: payload.id,
        activeFlag: true,
      },
    });
    if (!result) {
      return new NotFoundError();
    }
    result.dataValues = { ...result.dataValues, ...payload };
    return await result.save();
  } catch (error: any) {
    throw new InternalServerError(error.message);
  }
}

async function getAllProduct(limit?: number, offset?: number) {
  try {
    const result = await Product.findAndCountAll({
      where: {
        activeFlag: true,
      },
      offset: offset || 0,
      limit: limit || 10,
    });
    result.count;

    return {
      totalCounts: result.count,
      data: result.rows,
    };
  } catch (error: any) {
    throw new InternalServerError(error.message);
  }
}

async function getProductById(productId: number) {
  try {
    const result = await Product.findOne({
      where: {
        activeFlag: true,
        id: productId,
      },
    });

    if (!result) {
      throw new NotFoundError("Product Not Found");
    }
    return result;
  } catch (error: any) {
    throw new InternalServerError(error.message);
  }
}

async function getMostBoughtProducts(limit?: number, offset?: number) {
  try {
    // Query to get the most bought products

    const mostBoughtProducts = await Order.findAll({
      include: [
        {
          model: Product,
          as: "product",
          attributes: [],
        },
      ],
      attributes: [
        "productId",
        [db.fn("COUNT", "productId"), "total"],
        [db.literal("Product.name"), "name"],
      ],
      group: ["productId", "product.name"],
      order: [[db.literal("total"), "DESC"]],
      raw: true,
      limit: limit || 10,
      offset: offset || 0,
    });

    // Sort the most bought products based on customer preference
    const sortedProducts = mostBoughtProducts.map((product) => ({
      productId: product.productId,
      // @ts-ignore
      productName: product.name,
      total: product.total,
    }));

    // Calculate the total number of products bought
    const totalProductsBought = await Order.count();

    // Calculate the percentage of each category bought by customers
    const categoryPercentage = await (
      await Order.findAll({
        include: [
          {
            model: Product,
            as: "product",
            attributes: [],
          },
        ],
        attributes: [
          [db.fn("COUNT", "Product.category"), "total"],
          [db.literal("Product.category"), "category"],
        ],
        group: ["product.category"],
        order: [[db.literal("total"), "DESC"]],
        raw: true,
        limit: limit || 10,
        offset: offset || 0,
      })
    ).map((product: any) => ({
      category: product.category,
      percentage: (Number(product.total) / totalProductsBought) * 100,
    }));

    // Sort the categoryPercentage array based on percentage in descending order
    categoryPercentage.sort((a, b) => b.percentage - a.percentage);

    // Optionally, you can round the percentages here to a fixed number of decimal places
    categoryPercentage.forEach((category) => {
      category.percentage = Number(category.percentage.toFixed(2));
    });

    return { mostBoughtProducts: sortedProducts, categoryPercentage };
  } catch (error: any) {
    throw new InternalServerError(error.message);
  }
}

async function getMostBoughtProduct() {
  try {
    const mostBoughtProduct = await Product.findOne({
      attributes: [
        "id",
        "name",
        [
          db.literal(
            '(SELECT COUNT(*) FROM "Orders" WHERE "Orders"."productId" = "Product"."id")'
          ),
          "orderCount",
        ],
      ],
      order: [[db.literal('"orderCount"'), "DESC"]],
      raw: true,
      limit: 1,
    });
    return mostBoughtProduct;
  } catch (error: any) {
    throw new InternalServerError(error.message);
  }
}

export {
  createProduct,
  updateProduct,
  getAllProduct,
  getProductById,
  getMostBoughtProduct,
  getMostBoughtProducts,
};
