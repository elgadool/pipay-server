const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const PI = "https://api.minepi.com/v2/payments/";
const headers = {
  Authorization: "Key " + process.env.PI_API_KEY,
  "Content-Type": "application/json",
};

app.post("/approve", async (req, res) => {
  const r = await fetch(PI + req.body.paymentId + "/approve", { method: "POST", headers });
  res.status(r.status).json(await r.json());
});

app.post("/complete", async (req, res) => {
  const { paymentId, txid } = req.body;
  const r = await fetch(PI + paymentId + "/complete", {
    method: "POST", headers, body: JSON.stringify({ txid }),
  });
  res.status(r.status).json(await r.json());
});

app.listen(process.env.PORT || 3000);
