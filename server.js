const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(express.json())

require("./config/userdata").connect()

app.listen(port, () => {
  console.log(`sever listening on  ${port}`);
});
