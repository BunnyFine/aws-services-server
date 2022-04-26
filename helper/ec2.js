const {
  CreateTagsCommand,
  RunInstancesCommand,
  DescribeInstancesCommand,
  StartInstancesCommand,
  StopInstancesCommand,
  RebootInstancesCommand,
  TerminateInstancesCommand,
} = require("@aws-sdk/client-ec2");
const { ec2Client } = require("./ec2ObjectCreation");

// ami-04505e74c0741db8d Canonical, Ubuntu, 20.04 LTS, amd64
// ami-0f9fc25dd2506cf6d Amazon Linux 2 Kernel 5.10 AMI
const createInstance = async (nameOfInstance, amiID) => {
  const instanceParams = {
    ImageId: amiID,
    InstanceType: "t2.micro",
    KeyName: "DEMO_KEY",
    MinCount: 1,
    MaxCount: 1,
  };

  try {
    const data = await ec2Client.send(new RunInstancesCommand(instanceParams));
    console.log(data.Instances[0].InstanceId);
    const instanceId = data.Instances[0].InstanceId;
    console.log("Created instance", instanceId);
    const tagParams = {
      Resources: [instanceId],
      Tags: [
        {
          Key: "Name",
          Value: nameOfInstance,
        },
      ],
    };
    try {
      const data = await ec2Client.send(new CreateTagsCommand(tagParams));
      console.log("Instance tagged");
    } catch (err) {
      console.log("Error", err);
    }
    return instanceId;
  } catch (err) {
    console.log("Error", err);
  }
};

// createInstance();

const describeInstance = async () => {
  try {
    const data = await ec2Client.send(new DescribeInstancesCommand({}));
    const d = data.Reservations.map(({ Instances }) => {
      const [
        {
          ImageId,
          InstanceId,
          InstanceType,
          PrivateDnsName,
          PrivateIpAddress,
          PublicDnsName,
          PublicIpAddress,
          State: { Name: state },
          Placement: { AvailabilityZone },
          Tags: [{ Value: instanceName }],
        },
      ] = Instances;
      return {
        ImageId,
        InstanceId,
        InstanceType,
        PrivateDnsName,
        PrivateIpAddress,
        PublicDnsName,
        PublicIpAddress,
        state,
        AvailabilityZone,
        instanceName,
      };
    });
    return d;
  } catch (err) {
    console.log("Error", err);
  }
};

// describeInstance();

// const params = { InstanceIds: ["i-075b95e54928bb61e"] };
// const command = "stop";

const startAndStopInstance = async (instanceId, command) => {
  if (command.toUpperCase() === "START") {
    try {
      const data = await ec2Client.send(
        new StartInstancesCommand({ InstanceIds: [instanceId] })
      );
      console.log("Success", data.StartingInstances);
      return data;
    } catch (err) {
      console.log("Error2", err);
    }
  } else if (command.toUpperCase() === "STOP") {
    try {
      const data = await ec2Client.send(
        new StopInstancesCommand({ InstanceIds: [instanceId] })
      );
      console.log("Success", data.StoppingInstances);
      return data;
    } catch (err) {
      console.log("Error", err);
    }
  }
};

const rebootInstance = async (instanceId) => {
  try {
    const data = await ec2Client.send(
      new RebootInstancesCommand({ InstanceIds: [instanceId] })
    );
    console.log("Success", data);
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};
// startAndStopInstance("i-075b95e54928bb61e", "start");
// rebootInstance("i-075b95e54928bb61e");

const deleteInstance = async (instanceId) => {
  try {
    const data = await ec2Client.send(
      new TerminateInstancesCommand({ InstanceIds: [instanceId] })
    );
    console.log("Success", data);
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

// deleteInstance("i-075b95e54928bb61e");

module.exports = {
  createInstance,
  deleteInstance,
  startAndStopInstance,
  rebootInstance,
  describeInstance,
};
