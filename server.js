const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const { login, signup } = require("./handlers/auth");
require("dotenv").config();

const connectionString =
  process.env.MONGO_DB_CONNECTION || "mongodb://localhost:27017/bedurest";

const app = express();
const port = process.env.PORT || 9000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hola desde Bedurest API " });
});

app.post("/login", login);
app.post("/signup", signup);

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  })
  .catch(() => {
    console.error(`❗Couldn't connect to DB ${connectionString}`);
  });
