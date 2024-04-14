const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const userRouter = require("./routes/userroute");
const adminRouter = require("./routes/adminroute");
const doctorRouter = require("./routes/doctorroute");
app.use(express.json());

require("./config/userdata").connect();

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

app.listen(port, () => {
  console.log(`sever listening on  ${port}`);
});
