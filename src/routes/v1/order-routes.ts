import express from "express";
import validationRules from "../../utils/validation-rules";
import { validate } from "../../middlewares/express-validator";
import { handleResponse } from "../../middlewares/caughtError";
import {
  getOrderDetail,
  getOrdersDetail,
  orderCreate,
} from "../../controller/order-controller";
const router = express.Router();

router.post(
  "/",
  validate(validationRules.orderCreateValidationRules),
  handleResponse(orderCreate)
);

router.get(
  "/list",
  validate(validationRules.orderDetailsValidationRules),
  handleResponse(getOrderDetail)
);
router.get(
  "/:orderId",
  validate(validationRules.orderDetailValidationRules),
  handleResponse(getOrdersDetail)
);
export default router;
