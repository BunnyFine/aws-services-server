require("dotenv").config();
const fs = require("fs");
const AWS = require("aws-sdk");

const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

AWS.config.update({
  region,
  accessKeyId,
  secretAccessKey,
  apiVersion: "latest",
});
const ec2 = new AWS.EC2({ region: region });

async function createInstance() {
  const res = await ec2.runInstances({
    MaxCount: 1,
    MinCount: 1,
    ImageId: "ami-0851b76e8b1bce90b",
    InstanceType: "t2.micro	",
    KeyName: "keypair",
  });
  console.log(res);
}

module.exports = { createInstance };
