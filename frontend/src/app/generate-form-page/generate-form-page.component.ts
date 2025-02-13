import { Component, OnInit } from "@angular/core";
import { FormService } from "../services/form.service";

@Component({
  selector: "app-generate-form-page",
  templateUrl: "./generate-form-page.component.html",
  styleUrls: ["./generate-form-page.component.css"],
})
export class GenerateFormPageComponent implements OnInit {
  jsonInput: string = "";
  formSchema: any;
  errorMessage: string = "";

  formProperties = {
    name: "",
    id: "",
    owner: "",
    createdAt: "",
  };

  constructor(private formService: FormService) {}

  ngOnInit(): void {}

  // Parse the JSON input and handle errors
  generateForm(): void {
    try {
      this.formSchema = JSON.parse(this.jsonInput);

      // Validate schema structure
      if (!this.formSchema.view || !this.formSchema.view.schema) {
        throw new Error("Invalid JSON format: Missing schema");
      }

      // Handle fallback for tabs
      if (
        !this.formSchema.view.schema.tabs ||
        this.formSchema.view.schema.tabs.length === 0
      ) {
        if (Array.isArray(this.formSchema.view.schema.fields)) {
          this.formSchema.view.schema.tabs = [
            {
              name: "Main",
              text: "Main Form",
              id: "tab-001",
              fields: this.formSchema.view.schema.fields,
            },
          ];
        }
      }

      // Populate form properties from schema
      this.formProperties.name = this.formSchema.name || "Untitled Form";
      this.formProperties.id = this.formSchema.id || "default-id";
      this.formProperties.createdAt =
        this.formSchema.createdAt || new Date().toISOString();
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

      console.log(formSchemaToSave);

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
