const express = require("express");
const router = express.Router();
const formController = require("../controllers/formController");

console.log('***');

router.post("/save-form", formController.saveForm);
router.get("/form/:id", formController.getFormById);
router.put("/form/:id", formController.updateFormData);

module.exports = router;
