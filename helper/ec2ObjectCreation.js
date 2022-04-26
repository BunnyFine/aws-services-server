require("dotenv").config();
const {
  EC2Client,
  CreateTagsCommand,
  RunInstancesCommand,
} = require("@aws-sdk/client-ec2");
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const ec2Client = new EC2Client({
  region: "us-east-1",
  credentials: { accessKeyId: accessKeyId, secretAccessKey: secretAccessKey },
});

module.exports = { ec2Client };
