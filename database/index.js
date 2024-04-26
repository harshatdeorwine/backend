const mongoose = require("mongoose");
mongoose.set("debug", true);

exports.mongoConnection = mongoose
  .connect("mongodb://127.0.0.1:27017/RichardsAlum", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("-->> MongoDB connected successfully");
  })
  .catch((err) => console.log("MongoDB connection error -> ", err));
