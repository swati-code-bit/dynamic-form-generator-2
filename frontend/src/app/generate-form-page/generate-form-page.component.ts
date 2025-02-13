import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { FormService } from "../services/form.service";

@Component({
  selector: "app-generate-form-page",
  templateUrl: "./generate-form-page.component.html",
  styleUrls: ["./generate-form-page.component.css"],
})
export class GenerateFormPageComponent implements OnInit {
  formData: FormGroup;
  formSchema: any;
  jsonInput: string = "";
  errorMessage: string = "";

  formProperties = {
    name: "",
    id: "",
    owner: "",
    createdAt: "",
  };

  constructor(private fb: FormBuilder, private formService: FormService) {
    this.formData = this.fb.group({});
    this.formSchema = { view: { schema: { tabs: [] } } };
  }

  ngOnInit(): void {}

  generateForm(): void {
    try {
      this.formSchema = JSON.parse(this.jsonInput);

      if (
        !this.formSchema.view ||
        !this.formSchema.view.schema
      ) {
        throw new Error("Invalid JSON format: Missing schema");
      }

      // If no tabs exist, directly use fields
      if (!this.formSchema.view.schema.tabs || this.formSchema.view.schema.tabs.length === 0) {
        if (Array.isArray(this.formSchema.view.schema.fields)) {
          // Add a default tab if no tabs are present
          this.formSchema.view.schema.tabs = [{
            name: "Main",
            text: "Main Form",
            id: "tab-001",
            fields: this.formSchema.view.schema.fields,
          }];
        }
      }

      // Set form properties from schema
      this.formProperties.name = this.formSchema.name || "Untitled Form";
      this.formProperties.id = this.formSchema.id || "default-id";
      this.formProperties.createdAt = this.formSchema.createdAt || new Date().toISOString();
      this.formProperties.owner = this.formSchema.owner || "Unknown";

      this.errorMessage = "";
    } catch (error) {
      console.error("Error generating form:", error);
      this.errorMessage = `Error: ${error.message}`;
    }
  }

  saveFormSchema(): void {
    try {
      const formSchemaToSave = {
        name: this.formProperties.name,
        id: this.formProperties.id,
        createdAt: this.formProperties.createdAt,
        owner: this.formProperties.owner,
        view: this.formSchema.view,
      };

      this.formService.saveForm(formSchemaToSave).subscribe(
        (response) => {
          console.log("Form schema saved successfully:", response);
          alert("Form schema saved successfully!");
        },
        (error) => {
          console.error("Error saving form schema:", error);
          this.errorMessage = "Error saving form schema!";
        }
      );
    } catch (error) {
      console.error("Error generating form schema:", error);
      this.errorMessage = "Error generating form schema!";
    }
  }
}
