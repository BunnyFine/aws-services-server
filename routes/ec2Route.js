const express = require("express");
const {
  describeInstance,
  createInstance,
  deleteInstance,
  rebootInstance,
  startAndStopInstance,
} = require("../helper/ec2");
const router = express.Router();

router.get("/list", async (req, res) => {
  const r = await describeInstance();
  console.log(r);
  res.send(r);
});

router.post("/create-instance/:nameOfInstance/:amiID", async (req, res) => {
  const r = await createInstance(req.params.nameOfInstance, req.params.amiID);
  console.log(r);
  res.send(r);
});

router.delete("/delete-instance/:instanceId", async (req, res) => {
  const r = await deleteInstance(req.params.instanceId);
  console.log(r);
  res.send(r);
});

router.patch("/reboot-instance/:instanceId", async (req, res) => {
  const r = await rebootInstance(req.params.instanceId);
  console.log(r);
  res.send(r);
});

router.put("/start-instance/:instanceId", async (req, res) => {
  const r = await startAndStopInstance(req.params.instanceId, "start");
  console.log(r);
  res.send(r);
});

router.put("/stop-instance/:instanceId", async (req, res) => {
  const r = await startAndStopInstance(req.params.instanceId, "stop");
  console.log(r);
  res.send(r);
});

module.exports = router;
