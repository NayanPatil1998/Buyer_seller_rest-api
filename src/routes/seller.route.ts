import express from "express";
import { SellerMiddleware } from "../middlewares/seller.middleware";
import { createCatalog, getOrders } from "../controllers/seller.controller";
// import { checkIfAuthenticated } from "../middlewares/userMiddleware";

const SellerRoute = express.Router();

// usersRouter.get("/users", allUser);

SellerRoute.post("/seller/create-catalog", SellerMiddleware, createCatalog);
SellerRoute.get("/seller/orders", SellerMiddleware, getOrders);
export default SellerRoute;
