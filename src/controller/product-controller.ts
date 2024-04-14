import { Request, Response } from "express";
import {
  createProduct,
  getProductById,
  updateProduct,
  getAllProduct,
  getMostBoughtProduct,
  getMostBoughtProducts,
} from "../services/product.service";
const productCreate = (req: Request): any => {
  return createProduct(req.body);
};
const productUpdate = (req: Request): any => {
  return updateProduct(req.body);
};

const productGetById = (req: Request): any => {
  return getProductById(Number(req.params.productId));
};

const getAllProducts = (req: Request): any => {
  const offset = Number(req.query.offset);
  const limit = Number(req.query.limit);
  return getAllProduct(limit, offset);
};

const mostBoughtProduct = (req: Request): any => {
  return getMostBoughtProduct();
};

const mostBoughtProducts = (req: Request): any => {
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
