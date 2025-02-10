import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { FormService } from "../services/form.service";

@Component({
  selector: "app-form-generator",
  templateUrl: "./form-generator.component.html",
  styleUrls: ["./form-generator.component.css"],
})
export class FormGeneratorComponent implements OnInit {
  formData: FormGroup;
  formSchema: any;
  jsonInput: string = "";
  errorMessage: string = "";
  tabs: any[] = [];
  selectedTabId: string = "";

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

  ngOnInit(): void {
    // formData is already initialized in the constructor, so we don't need to do it here.
  }

  generateForm(): void {
    try {
      this.formSchema = JSON.parse(this.jsonInput);

      if (
        !this.formSchema.view ||
        !this.formSchema.view.schema ||
        !Array.isArray(this.formSchema.view.schema.tabs)
      ) {
        throw new Error("Invalid JSON format: Missing or invalid tabs array");
      }

      this.formProperties.name = this.formSchema.name;
      this.formProperties.id = this.formSchema.id;
      this.formProperties.createdAt =
        this.formSchema.createdAt || new Date().toISOString();
      this.formProperties.owner = this.formSchema.owner || "Unknown";

      const group: { [key: string]: FormControl } = {};
      this.tabs = this.formSchema.view.schema.tabs;

      this.tabs.forEach((tab) => {
        if (Array.isArray(tab.fields)) {
          tab.fields.forEach((field: any) => {
            const validators = this.getValidators(field.rules);
            group[field.name] = new FormControl(field.value || "", validators);
          });
        }
      });

      this.formData = this.fb.group(group);
      this.errorMessage = "";

      if (this.tabs.length > 0) {
        this.selectedTabId = this.tabs[0].id;
      }

      this.formData.valueChanges.subscribe((value) => {
        console.log("Form values:", value);
      });
    } catch (error) {
      console.error("Error generating form:", error);
      this.errorMessage = `Error: ${error.message}`;
    }
  }

  getValidators(rules: any[]): any[] {
    const validators: any[] = [];
    if (Array.isArray(rules)) {
      rules.forEach((rule) => {
        if (rule.type === "required") {
          validators.push(Validators.required);
        }
        if (rule.type === "maxLength") {
          validators.push(Validators.maxLength(rule.value));
        }
        if (rule.type === "pattern") {
          validators.push(Validators.pattern(rule.value));
        }
        if (rule.type === "email") {
          validators.push(Validators.email);
        }
      });
    }
    return validators.length > 0 ? validators : null;
  }

  // Assuming you want to handle tab selection in the template
  handleTabSelection(tabId: string): void {
    this.selectedTabId = tabId;
    console.log(`Selected tab ID: ${this.selectedTabId}`);
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
