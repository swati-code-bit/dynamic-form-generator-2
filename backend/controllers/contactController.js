const Contact = require("../models/contactModel");

exports.createContact = async (req, res) => {
  try {
    const contactData = req.body;

    const newContact = new Contact({
      data: contactData,
    });

    await newContact.save();

    res.status(201).json({
      message: "Contact created successfully",
      contact: newContact,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error creating contact",
      error: error.message,
    });
  }
};
