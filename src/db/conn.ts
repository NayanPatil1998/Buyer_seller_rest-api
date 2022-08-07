import Mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const initdb = async () => {
  if (Mongoose.connections[0].readyState) {
    console.log("Already Connected");
    return;
  }

  try {
      await Mongoose.connect(process.env.DATABASE_URL, );
      console.log(Mongoose.connections[0].readyState);

    // await mongoose.connect('mongodb://localhost:27017/test');
  } catch (error) {
    console.log(error);
  }

  Mongoose.connection.on("connected", () => {
    console.log("connected to mongoDB");
  });
  Mongoose.connection.on("error", (err) => {
    console.log("err", err);
  });
};

export default initdb;

// import path from "path";
// import { DataSource } from "typeorm";

// export const AppDataSource = new DataSource({
//     type: "postgres",
//     url: process.env.DATABASE_URL,
//     logging: true,
//     // synchronize: true,
//     migrations: [path.join(__dirname, "./migrations/*")],
//     entities: ["dist/src/entities/*.entity.js"],
//   });
