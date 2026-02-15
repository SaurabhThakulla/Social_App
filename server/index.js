const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

/* =======================
   MIDDLEWARE
======================= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =======================
   API ROUTES
======================= */
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running smoothly!",
  });
});

/* 
  Later you can add:
  app.use("/api/auth", require("./routes/auth"));
  app.use("/api/users", require("./routes/users"));
*/

/* =======================
   SERVE FRONTEND (PROD)
======================= */
if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(path.join(__dirname, "../client/dist"))
  );

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../client/dist/index.html")
    );
  });
}

/* =======================
   START SERVER
======================= */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
