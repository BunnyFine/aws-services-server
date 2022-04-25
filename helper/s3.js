require("dotenv").config();
const fs = require("fs");
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

AWS.config.update({
  region,
  accessKeyId,
  secretAccessKey,
  apiVersion: "latest",
});
const s3 = new AWS.S3();

// function to upload file to s3 bucket
const putObject = multer({
  storage: multerS3({
    bucket: (req, file, cb) => {
      cb(null, req.params.bucket);
    },
    s3: s3,
    // acl: "public-read",
    key: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

// function to download file from s3 bucket
async function getObject(bucket, object, res) {
  const data = await s3
    .getObject({
      Key: object,
      Bucket: bucket,
    })
    .createReadStream();
  return data.pipe(res);
}

// function to list all objects of a bucket
async function listAllObjects(bucket) {
  const res = await s3.listObjectsV2({ Bucket: bucket }).promise();
  return res.Contents.map((elem) => elem.Key);
}
// function to delete object of a bucket
async function deleteObject(bucket, object) {
  await s3.deleteObject({ Bucket: bucket, Key: object }).promise();
}

// function to create bucket
async function createBucket(bucket) {
  const res = await s3.createBucket({ Bucket: bucket }).promise();
  return res;
}

// function to delete bucket
async function deleteBucket(bucket) {
  const res = await s3.deleteBucket({ Bucket: bucket }).promise();
  return res;
}

async function listAllBuckets() {
  const res = await s3.listBuckets().promise();
  return res;
}
module.exports = {
  getObject,
  deleteObject,
  putObject,
  listAllObjects,
  createBucket,
  deleteBucket,
  listAllBuckets,
};
