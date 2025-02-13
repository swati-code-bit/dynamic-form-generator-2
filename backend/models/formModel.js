const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  createdAt: { type: Date, required: true },
  owner: { type: String, required: true },
  view: {
    schema: {
      labelMandatoryIcon: { type: String, required: true },
      tabs: [
        {
          name: { type: String, required: true },
          text: { type: String, required: true },
          id: { type: String, required: true },
          fields: [
            {
              name: { type: String, required: true },
              text: { type: String, required: true },
              widget: { type: String, required: true },
              type: { type: String, required: true },
              mandatory: { type: Boolean, required: true },
              disabled: { type: Boolean, default: false },
              hidden: { type: Boolean, default: false },
              spellcheck: { type: Boolean, default: true },
              maxLength: { type: Number, default: 255 },
              minLength: { type: Number, default: 0 },
              pattern: [String], // This makes `pattern` an array of strings.

              value: { type: String, default: "" },
              properties: {
                datasource: {
                  type: [{ type: String }],
                  default: [],
                },
                defaultValue: {
                  type: String,
                  default: "",
                },
              },
            },
          ],
        },
      ],
    },
  },
  formData: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },
});

const FormModel = mongoose.model("Form", formSchema);

module.exports = FormModel;
