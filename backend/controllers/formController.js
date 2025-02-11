const FormModel = require("../models/formModel");

exports.saveForm = (req, res) => {
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
      console.error("Error saving form:", error);
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

exports.getForms = async (req, res) => {
  try {
    // Fetch all forms excluding the version key (`__v`)
    const forms = await FormModel.find({}, { __v: 0 });

    // Check if forms were found
    if (!forms || forms.length === 0) {
      return res.status(404).json({ message: "No forms found" });
    }

    // Send back the forms as JSON
    res.status(200).json(forms);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ message: "Error fetching forms", error });
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

