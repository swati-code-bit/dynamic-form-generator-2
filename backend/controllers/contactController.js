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

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();

    if (!contacts || contacts.length === 0) {
      return res.status(404).json({
        message: "No contacts found",
      });
    }

    res.status(200).json({
      message: "Contacts fetched successfully",
      contacts: contacts,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error fetching contacts",
      error: error.message,
    });
  }
};
