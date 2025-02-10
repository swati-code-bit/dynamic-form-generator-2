const mongoose = require('mongoose');

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
              value: { type: String },
              rules: [
                {
                  type: { type: String, required: true },
                  value: { type: mongoose.Schema.Types.Mixed },
                  message: { type: String, required: true },
                },
              ],
              datasource: [String],
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

const FormModel = mongoose.model('Form', formSchema);

module.exports = FormModel;
