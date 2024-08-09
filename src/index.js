require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const sequelize = require("./../db/index");
const loyaltyRoutes = require("./routes/loyalty");

app.use("/", loyaltyRoutes);

//Test DB connection
app.get("/health", async (req, res) => {
  try {
    await sequelize.authenticate();
    res
      .status(200)
      .json({ status: "success", message: "Database connection is healthy" });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Unable to connect to the database",
      error: error.message,
    });
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to the Loyalty and Rewards API");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
