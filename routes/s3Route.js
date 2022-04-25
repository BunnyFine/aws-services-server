const express = require("express");
const router = express.Router();
const {
  listAllObjects,
  getObject,
  putObject,
  deleteObject,
  createBucket,
  deleteBucket,
  listAllBuckets,
} = require("../helper/s3");

router.get("/list", async (req, res) => {
  const result = await listAllBuckets();
  console.log(result);
  res.send(result);
});

router.get("/list/:bucket", async (req, res) => {
  try {
    const result = await listAllObjects(req.params.bucket);
    console.log(result);
    res.send(result);
  } catch (e) {
    console.log("error");
    console.log(e);
    res.send("error");
  }
});

router.get("/download/:bucket/:key", async (req, res) => {
  try {
    await getObject(req.params.bucket, req.params.key, res);
  } catch (error) {
    console.log(error);
    res.send("error");
  }
});

router.post("/upload/:bucket", putObject.single("object"), (req, res) => {
  res.send("uploaded");
});

router.delete("/delete/:bucket/:key", async (req, res) => {
  await deleteObject(req.params.bucket, req.params.key);
  res.send("deleted");
});

router.post("/create-bucket/:bucket", async (req, res) => {
  try {
    const result = await createBucket(req.params.bucket);
    console.log(result);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.delete("/delete-bucket/:bucket", async (req, res) => {
  const result = await deleteBucket(req.params.bucket);
  console.log(result);
  res.send("deleted");
});
module.exports = router;
