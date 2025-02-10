const express = require("express");
const Contact = require("../models/contactModel");
const router = express.Router();

router.post("/api/contacts", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).send(contact);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
