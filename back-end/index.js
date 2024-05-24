const express = require("express");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./src/routes");
const bodyParser = require("body-parser");
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
app.use(bodyParser.json());
routes(app);
const MONGOURL = process.env.MONGO_URL;
mongoose
  .connect(MONGOURL)
  .then((result) => {
    console.log("connect db successfull !");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(port, () => {
  console.log(`Example app listening on port:http://localhost:${port}`);
});
