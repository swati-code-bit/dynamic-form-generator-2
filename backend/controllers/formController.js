const Form = require("../models/formModel");

const saveForm = async (req, res) => {
  const { formName, schema } = req.body;
  try {
    const newForm = new Form({ formName, schema });
    await newForm.save();
    res.status(200).send("Form saved");
  } catch (error) {
    res.status(500).send("Error saving form");
  }
};

const getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.staus(200).json(forms);
  } catch (error) {
    res.staus(500).send("Error fetching forms");
  }
};

const getFormById = async (req, res) => {
  const { id } = req.params;

  try {
    const form = await Form.findById(id);

    if (!form) {
      return res.status(404).send("Form not found");
    }

    res.status(200).json(form);
  } catch (error) {
    res.status(500).send("Error fetching form");
  }
};
