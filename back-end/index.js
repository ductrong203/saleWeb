const express = require("express");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./src/routes");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
dotenv.config();

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
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
