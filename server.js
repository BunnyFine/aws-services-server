const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const app = express();
app.use(cors());

// for s3 services
app.use("/s3", require("./routes/s3Route"));

// for ec2 servicess
app.use("/ec2", require("./routes/ec2Route"));

app.listen(3010, () => {
  console.log("listening");
});
