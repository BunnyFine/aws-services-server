const { CreateKeyPairCommand } = require("@aws-sdk/client-ec2");
const { ec2Client } = require("./ec2ObjectCreation");

const params = { KeyName: "DEMO_KEY" };

const run = async () => {
  try {
    const data = await ec2Client.send(new CreateKeyPairCommand(params));
    console.log(JSON.stringify(data));
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};
run();
