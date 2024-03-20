const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const userRouter = require("./routes/userroute");
const adminRouter = require("./routes/adminroute");
app.use(express.json());

require("./config/userdata").connect();

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success,
    statusCode,
    message,
  });
});

app.listen(port, () => {
  console.log(`sever listening on  ${port}`);
});
