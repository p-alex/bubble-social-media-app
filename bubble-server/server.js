const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const getPost = require("./routes/getPost");
const handlePosts = require("./routes/handlePosts");
const dotenv = require("dotenv").config();
const app = express();
app.use(express.urlencoded({ limit: "2mb", extended: true }));
app.use(express.json({ limit: "2mb" }));
app.use(cors());
app.use("/api", getPost);
app.use("/", handlePosts);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`SERVER STARTED ON PORT ${PORT}`);
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((response) => {
    if (response) {
      console.log("MONGO CONNECTED");
    }
  })
  .catch((error) => console.log(error));
