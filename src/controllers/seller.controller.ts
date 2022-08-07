import Product, { IProductModel } from "../Schemas/product";
import { Request, Response } from "express";
import Catalog, { ICatalogModel } from "../Schemas/Catalog";
import Order from "../Schemas/Order";

export const createCatalog = async (req: Request, res: Response) => {
  if (!req.body.products) {
    res.status(500).json({
      message: "Body Fields are incorrect",
    });
    return;
  }
  const products: IProductModel[] = req.body.products;

  try {
    let checkCatalog = await Catalog.findOne({
      sellerId: req.session.user._id,
    });

    if (checkCatalog) {
      return res.status(500).json({
        message: "Seller has already 1 catalog",
      });
    }

    const catalog: ICatalogModel = new Catalog({
      sellerId: req.session.user._id,
    });

    await catalog.save();

    products.map(async (product) => {
      const newProduct: IProductModel = new Product({
        price: product.price,
        name: product.name,
        catalogId: catalog._id,
      });

      newProduct.save();
    });

    res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message ?? "Something went wrong",
    });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ sellerId: req.session.user._id });
    return res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message ?? "Something went wrong",
    });
  }
};
