const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const userRouter = require("./routes/userroute");

app.use(express.json());

require("./config/userdata").connect();

app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`sever listening on  ${port}`);
  
});
