import { DataTypes, Model } from "sequelize";
import db from "../config/db";
import { Order } from "./order";

class Product extends Model {
  public id!: number;
  public name!: string;
  public price!: number;
  public stock!: number;
  public acitveFlag!: boolean;
  public category!: string;

  // Define static associations etc.
  static associate() {
    // Define association with Order model
    Product.hasMany(Order, {
      foreignKey: "productId",
      as: "orders", // Alias for the orders associated with this customer
    });
  }
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    activeFlag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize: db, timestamps: true }
);

export { Product };
