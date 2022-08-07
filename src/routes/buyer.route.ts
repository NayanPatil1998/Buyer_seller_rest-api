import express from "express";
import { getAllSellers, getCatalogBySellerId, placeOrder } from "../controllers/buyer.controller";
import { BuyerMiddleware } from "../middlewares/buyer.middleware";

const BuyerRoute = express.Router();

// usersRouter.get("/users", allUser);

BuyerRoute.get("/buyer/list-of-sellers", BuyerMiddleware, getAllSellers);
BuyerRoute.get("/buyer/seller-catalog/:seller_id", BuyerMiddleware, getCatalogBySellerId);
BuyerRoute.post("/buyer/create-order/:seller_id", BuyerMiddleware, placeOrder);
export default BuyerRoute;
