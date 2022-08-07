import Mongoose, { Document, Schema } from "mongoose";

export interface IProductModel extends Document {
  _id: string;
  name: string;
  price: number;
  catalogId: string
}

const productSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  catalogId: {
    type: String,
    required: true
  }
  
}, {timestamps: true});

const Product = Mongoose.model<IProductModel>(
  "Product",
  productSchema,
  "Products"
);
export default Product;
