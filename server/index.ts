import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/routes";
import { connectDB } from "./config/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", routes);

const startServer = async function () {
  await connectDB();

  app.listen(PORT, function () {
    console.log("🚀 Server running on port " + PORT);
  });
};

startServer();