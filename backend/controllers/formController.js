const FormModel = require("../models/formModel");

exports.saveForm = (req, res) => {
  console.log('Received data:', req.body); // Log request data
  const { name, id, createdAt, owner, view } = req.body;

  const newForm = new FormModel({
    name,
    id,
    createdAt: new Date(createdAt),
    owner,
    view,
  });

  newForm
    .save()
    .then((form) => {
      res.status(200).json(form);
    })
    .catch((error) => {
      console.error("Error saving form:", error); // Log error
      res.status(500).json({ message: "Error saving form", error });
    });
};


exports.getFormById = async (req, res) => {
  try {
    const form = await FormModel.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json(form);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateFormData = async (req, res) => {
  try {
    const form = await FormModel.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    form.formData = req.body.formData;
    await form.save();
    res.status(200).json(form);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
