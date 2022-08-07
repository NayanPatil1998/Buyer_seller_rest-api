import { Request, Response } from "express";
import Product, { IProductModel } from "../Schemas/product";
import Catalog from "../Schemas/Catalog";
import User from "../Schemas/User";
import Order from "../Schemas/Order";
import { isValidObjectId } from "mongoose";

export const getAllSellers = async (req: Request, res: Response) => {
  try {
    const sellers = await User.find({ type: "seller" });
    return res.status(200).json(sellers);
  } catch (error) {
    res.status(500).json({
      message: error.message ?? "Something went wrong",
    });
  }
};

export const getCatalogBySellerId = async (req: Request, res: Response) => {
  const sellerId = req.params.seller_id;

  try {
    let catalog = await Catalog.findOne({ sellerId });

    if (!catalog) {
      return res.status(500).json({
        message: "Seller doesnt have any catalogs",
      });
    }

    const products = await Product.find({ catalogId: catalog._id });

    return res.status(200).json({ catelog: { catalog, products } });
  } catch (error) {
    res.status(500).json({
      message: error.message ?? "Something went wrong",
    });
  }
};

export const placeOrder = async (req: Request, res: Response) => {
  let error;
  const sellerId = req.params.seller_id;
  if (!req.body.products) {
    res.status(500).json({
      message: "Body Fields are incorrect",
    });
    return;
  }
  const products: string[] = req.body.products;
  if (!isValidObjectId(sellerId)) {
    return res.status(500).json({
      message: "Seller not exist",
    });
  }
  try {
    const seller = await User.findOne({ _id: sellerId });
    if (!seller) {
      res.status(500).json({
        message: "Invalid seller",
      });
    }
    products.map(async (proId) => {
      if (!isValidObjectId(proId)) {
        error = "invalid productId";
        return;
      }
      const product = await Product.findOne({ _id: proId });
      if (!product) {
        error = "invalid productId";
        return;
      }
    });

    if (error) {
      return res.status(500).json({
        message: error,
      });
    }

    const order = await Order.create({
      sellerId,
      buyerId: req.session.user._id,
      products,
    });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message ?? "Something went wrong",
    });
  }
};
