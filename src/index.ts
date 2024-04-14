import express from "express";
import db from "./config/db";
import apiRoutes from "./routes/index";
import { returnError } from "./middlewares/caughtError";
import "./models/index";
const app = express();

app.listen(process.env.PORT || 3000, async () => {
  try {
    console.log("server starting");
    await db.authenticate();
    console.log("db connected");
  } catch (error) {
    console.log("error while starting server", error);
  }
});

app.use(express.json());
app.use("/api", apiRoutes);
app.use(returnError);
