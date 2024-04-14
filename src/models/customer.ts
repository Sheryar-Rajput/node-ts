import { DataTypes, Model } from "sequelize";
import db from "../config/db";
import { Order } from "./order";

class Customer extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public cardNumber!: string;
  public phoneNumber!: string;
  public isActive!: boolean;

  // Define static associations etc.
  static associate() {
    // Define association with Order model
    Customer.hasMany(Order, {
      foreignKey: "customerId",
      as: "orders", // Alias for the orders associated with this customer
    });
  }
}

Customer.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cardNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  { sequelize: db, timestamps: true }
);

export { Customer };
