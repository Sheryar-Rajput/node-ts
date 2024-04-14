import express from "express";
import customerRouter from "./customer-routes";
import orderRouter from "./order-routes";
import productRouter from "./product-routes";

const router = express.Router();
router.use("/customer", customerRouter);
router.use("/order", orderRouter);
router.use("/product", productRouter);

export default router;
