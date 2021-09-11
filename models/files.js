const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileschema = new Schema({
  uuid:{
      type:String,
      required:true
  },
  path: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("File", fileschema);
