const express = require("express");
require("dotenv").config();
const app = express();
const mongodb = require("./conn/conn");
const auth = require("./routes/auth");
mongodb();

app.use(express.json());
app.use("/auth", auth);
app.get("/", (req, res) => {
  res.send("Hello backend working");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server Running at ${port}`));
