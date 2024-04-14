import express from "express";
import { validate } from "../../middlewares/express-validator";
import validationRules from "../../utils/validation-rules";
import {
  productCreate,
  productUpdate,
  productGetById,
  getAllProducts,
  mostBoughtProduct,
  mostBoughtProducts,
} from "../../controller/product-controller";
import { handleResponse } from "../../middlewares/caughtError";
const router = express.Router();

router.post(
  "/",
  validate(validationRules.productCreateValidationRules),
  handleResponse(productCreate)
);
router.put(
  "/",
  validate(validationRules.productUpdateValidationRules),
  handleResponse(productUpdate)
);
router.get(
  "/all",
  validate(validationRules.productGetAllValidationRules),
  handleResponse(getAllProducts)
);

router.get("/most-bought-product", handleResponse(mostBoughtProduct));
router.get(
  "/most-bought-products",
  validate(validationRules.productGetAllValidationRules),
  handleResponse(mostBoughtProducts)
);
router.get(
  "/:productId",
  validate(validationRules.productGetValidationRules),
  handleResponse(productGetById)
);
export default router;
