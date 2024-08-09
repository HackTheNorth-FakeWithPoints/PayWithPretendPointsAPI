const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Import routes
const loyaltyRoutes = require("./routes/loyalty");

// Use routes
app.use("/", loyaltyRoutes);

// Handle root URL
app.get("/", (req, res) => {
  res.send("Welcome to the Loyalty and Rewards API");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
