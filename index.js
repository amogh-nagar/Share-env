const fileroutes = require("./routes/file-routes");
const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("hello from simple server :)");
});

app.use("/file", fileroutes);

mongoose
  .connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) =>
    app.listen(port, () =>
      console.log("> Server is up and running on port : " + port)
    )
  )
  .catch((err) =>
    console.log(
      `> Error while connecting to mongoDB : ${err.message}`.underline.red
    )
  );
