const express = require("express");
const router = express.Router();
const formController = require("../controllers/formController");

router.post("/save-form", formController.saveForm);
router.get("/get-forms", formController.getForms);    
router.get("/:id", formController.getFormById);       
router.put("/:id", formController.updateFormData);

module.exports = router;