const express = require("express");
const Form = require("../models/formModel");
const router = express.Router();

router.post("/api/forms", async (req, res) => {
  try {
    const { name, schema } = req.body;
    const form = new Form({ name, schema });
    await form.save();
    res.status(201).send(form);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/api/forms", async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).send(forms);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
