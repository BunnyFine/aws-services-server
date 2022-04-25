const express = require("express");
const { createInstance } = require("../helper/ec2");
const router = express.Router();

router.post("/demo", async (req, res) => {
  const r = await createInstance();
  console.log(r);
  res.send("ok");
});

module.exports = router;
