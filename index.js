// install express with `npm install express`

const express = require("express");
const cors = require("cors");
require("dotenv").config();
// const dbConfig = require("./config/db.config");
const app = express();

app.get("/", (req, res) => res.send("hey, you are on npm backend "));

const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
const db = require("./models");
require("./routes/wholesaler/wholesaler.routes")(app);
require("./routes/retailer/retailer.routes")(app);
require("./routes/product/product.routes")(app);

const uri =
  "mongodb+srv://kaustubh:kaustubh786@cluster0.1ct2btc.mongodb.net/?retryWrites=true&w=majority";
db.mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
  }
);

app.get("/", (req, res, next) => {
  res.json({ message: "hey, you are on npm backend" });
});

const PORT = process.env.port || 8080;
app.listen(PORT, () => {
  console.log(`Server is running at port number :${PORT}`);
});

// export 'app'
module.exports = app;
