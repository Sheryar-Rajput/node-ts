import { body, param, query } from "express-validator";

const validationRules = {
  userCreateValidationRules: [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("cardNumber")
      .optional()
      .isCreditCard()
      .withMessage("Invalid credit card number"),
    body("phoneNumber")
      .optional()
      .isMobilePhone("any", { strictMode: false })
      .withMessage("Invalid phone number"),
  ],

  userUpdateValidationRules: [
    body("id").notEmpty().isNumeric().withMessage("id is required"),
    body("name").optional().notEmpty().withMessage("Name is required"),
    body("email").optional().isEmail().withMessage("Invalid email address"),
    body("cardNumber")
      .optional()
      .isCreditCard()
      .withMessage("Invalid credit card number"),
    body("phoneNumber")
      .optional()
      .isMobilePhone("any", { strictMode: false })
      .withMessage("Invalid phone number"),
  ],
  userGetValidationRules: [
    param("customerId")
      .notEmpty()
      .isNumeric()
      .withMessage("customerId is required and must be numeric"),
  ],
  userGetAllValidationRules: [
    query("limit")
      .optional()
      .isNumeric()
      .withMessage("Invalid must be a number"),
    query("start")
      .optional()
      .isNumeric()
      .withMessage("Invalid must be a number"),
  ],
  productCreateValidationRules: [
    body("name").notEmpty().withMessage("Name is required"),
    body("price")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),
    body("stock")
      .isInt({ min: 0 })
      .withMessage("Stock must be a non-negative integer"),
    body("activeFlag")
      .optional()
      .isBoolean()
      .withMessage("Active flag must be a boolean value"),
    body("category").notEmpty().withMessage("Category is required"),
  ],

  productUpdateValidationRules: [
    body("id").notEmpty().isInt(),
    body("name").optional().notEmpty().withMessage("Name is required"),
    body("price")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),
    body("stock")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Stock must be a non-negative integer"),
    body("activeFlag")
      .optional()
      .isBoolean()
      .withMessage("Active flag must be a boolean value"),
    body("category").optional().notEmpty().withMessage("Category is required"),
  ],
  productGetAllValidationRules: [
    query("limit")
      .optional()
      .isNumeric()
      .withMessage("Invalid must be a number"),
    query("start")
      .optional()
      .isNumeric()
      .withMessage("Invalid must be a number"),
  ],
  productGetValidationRules: [
    param("productId")
      .notEmpty()
      .isNumeric()
      .withMessage("productId is required and must be numeric"),
  ],
  orderCreateValidationRules: [
    body("customerId")
      .notEmpty()
      .isNumeric()
      .withMessage("customerId is required and must be numeric"),
    body("productId")
      .notEmpty()
      .isNumeric()
      .withMessage("productId is required and must be numeric"),
    body("quantity")
      .notEmpty()
      .isNumeric()
      .withMessage("quantity is required and must be numeric"),
  ],
  orderDetailValidationRules: [
    param("orderId")
      .notEmpty()
      .isNumeric()
      .withMessage("orderId is required and must be numeric"),
  ],
  orderUpdateValidationRules: [
    body("quantity")
      .optional()
      .isNumeric()
      .withMessage("quantity must be numeric"),
  ],
};

export default validationRules;
