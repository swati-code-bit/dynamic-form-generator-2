const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  name: { type: String, required: true },
  schema: { type: Object, required: true },
});

const Form = mongoose.model("Form", formSchema);
module.exports = Form;
