import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/routes";
import { connectDB } from "./config/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api", routes);
app.get("/", function (req, res) {
  res.send("AURA API running ");
});

const startServer = async function () {
  await connectDB();
  app.listen(PORT, function () {
    console.log("local seed compiling on port " + PORT);
  });
};

startServer();
