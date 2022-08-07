import Mongoose, { Document, Schema } from "mongoose";
import { IProductModel } from "./product";

export interface ICatalogModel extends Document {
  _id: string;
  sellerId: string;
  products?: (IProductModel & Required<{
    _id: string;
}>)[]
}

const CatalogSchema: Schema = new Schema({
  sellerId: {
    type: String,
    required: true,
  },
  
}, {timestamps: true});

const Catalog = Mongoose.model<ICatalogModel>(
  "Catalog",
  CatalogSchema,
  "Catalogs"
);
export default Catalog;
