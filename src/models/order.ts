import { DataTypes, Model } from "sequelize";
import db from "../config/db";
import { Product } from "./product"; // Import Product model
import { Customer } from "./customer"; // Import Customer model

class Order extends Model {
  public id!: number;
  public productId!: number;
  public customerId!: number;
  public quantity!: number;
  public total!: number;

  static associate() {
    // Define association with Product model
    Order.belongsTo(Product, {
      foreignKey: "productId",
      as: "product", // Alias for the Product model
    });

    // Define association with Customer model
    Order.belongsTo(Customer, {
      foreignKey: "customerId",
      as: "customer", // Alias for the Customer model
    });
  }
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize: db, timestamps: true }
);

async () => {
  await Order.associate();
};

export { Order };
