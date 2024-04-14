import express from "express";
import validationRules from "../../utils/validation-rules";
import { validate } from "../../middlewares/express-validator";
import { handleResponse } from "../../middlewares/caughtError";
import { getOrderDetail, orderCreate } from "../../controller/order-controller";
const router = express.Router();

router.post(
  "/",
  validate(validationRules.orderCreateValidationRules),
  handleResponse(orderCreate)
);

router.get("/list", handleResponse(getOrderDetail));
export default router;
