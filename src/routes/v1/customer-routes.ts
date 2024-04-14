import express from "express";
import {
  customerCreate,
  customerUpdate,
  getCustomer,
  getCustomers,
} from "../../controller/customer-controller";
import { handleResponse } from "../../middlewares/caughtError";
import { validate } from "../../middlewares/express-validator";
import validationRules from "../../utils/validation-rules";
const router = express.Router();

router.post(
  "/",
  validate(validationRules.userCreateValidationRules),
  handleResponse(customerCreate)
);

router.put(
  "/",
  validate(validationRules.userUpdateValidationRules),
  handleResponse(customerUpdate)
);

router.get(
  "/all",
  validate(validationRules.userGetAllValidationRules),
  handleResponse(getCustomers)
);
router.get(
  "/:customerId",
  validate(validationRules.userGetValidationRules),
  handleResponse(getCustomer)
);

export default router;
