const express = require("express");
const router = express.Router();

// /loyalty/points/transfer
router.post("/loyalty/points/transfer", (req, res) => {
  res.send("Points transferred");
});

// /loyalty/points/payWithPoints
router.post("/loyalty/points/payWithPoints", (req, res) => {
  res.send("Paid with points");
});

// /loyalty/points/convert
router.post("/loyalty/points/convert", (req, res) => {
  res.send("Points converted");
});

// /loyalty/points/convert/calculatePoints
router.post("/loyalty/points/convert/calculatePoints", (req, res) => {
  res.send("Calculated points");
});

// /rewards/api/client/accounts/:accountId/transactionHistory
router.get(
  "/rewards/api/client/accounts/:accountId/transactionHistory",
  (req, res) => {
    const { accountId } = req.params;

    res.send(`Transaction history for account ${accountId}`);
  }
);

// /rewards/api/client/accounts/:accountId/transactionDetail/:referenceId
router.get(
  "/rewards/api/client/accounts/:accountId/transactionDetail/:referenceId",
  (req, res) => {
    const { accountId, referenceId } = req.params;

    res.send(
      `Transaction detail for account ${accountId} with reference ${referenceId}`
    );
  }
);

module.exports = router;
