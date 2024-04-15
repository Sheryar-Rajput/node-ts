import { Request } from "express";
import {
  createProduct,
  getProductById,
  updateProduct,
  getAllProduct,
  getMostBoughtProduct,
  getMostBoughtProducts,
} from "../services/product.service";
import { ProductResponse } from "../interfaces/product.interface";
async function productCreate(req: Request): Promise<ProductResponse> {
  return createProduct(req.body);
}
async function productUpdate(req: Request): Promise<ProductResponse> {
  return updateProduct(req.body);
}

async function productGetById(req: Request): Promise<ProductResponse> {
  return getProductById(Number(req.params.productId));
}

async function getAllProducts(req: Request): Promise<{
  totalCounts: number;
  data: ProductResponse[];
}> {
  const offset = Number(req.query.offset);
  const limit = Number(req.query.limit);
  return getAllProduct(limit, offset);
}

async function mostBoughtProduct(req: Request): Promise<any> {
  return getMostBoughtProduct();
}

const mostBoughtProducts = (req: Request): Promise<any> => {
  const offset = Number(req.query.offset);
  const limit = Number(req.query.limit);
  return getMostBoughtProducts(limit, offset);
};
export {
  productCreate,
  productUpdate,
  productGetById,
  getAllProducts,
  mostBoughtProduct,
  mostBoughtProducts,
};
