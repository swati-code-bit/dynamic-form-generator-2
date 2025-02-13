const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  { strict: false }
);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
