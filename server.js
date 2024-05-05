const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const userRouter = require("./routes/userroute");
const adminRouter = require("./routes/adminroute");
const doctorRouter = require("./routes/doctorroute");
const path = require("path");
const _dirname = path.resolve();
app.use(express.json());

require("./config/userdata").connect();

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

app.use(express.static(path.join(_dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(_dirname, "client", "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`sever listening on  ${port}`);
});
