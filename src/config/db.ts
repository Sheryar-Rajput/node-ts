import { env } from "process";
import { Sequelize } from "sequelize";
import dbConfig from "./config.json";
const isProd: string = env.ENVIRONMENT || "developemnt";
const config = isProd ? dbConfig.production : dbConfig.development;
const connectionUrl = `postgres://${config.username}:${config.password}@${
  config.host
}:${5432}/${config.database}?sslmode=require`;
const db = new Sequelize(connectionUrl, {
  host: config.host,
  dialect: "postgres",
});

export default db;
