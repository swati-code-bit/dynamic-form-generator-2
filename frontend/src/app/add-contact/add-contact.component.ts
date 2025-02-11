import { Component, OnInit } from "@angular/core";
import { ContactService } from "../services/contact.service";
import { FormService } from "../services/form.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-add-contact",
  templateUrl: "./add-contact.component.html",
  styleUrls: ["./add-contact.component.css"],
})
export class AddContactComponent implements OnInit {
  formNames: any[] = [];
  selectedFormObjectId: string = "";
  selectedFormName: string = "";
  formSchema: any;
  formData: FormGroup;

  constructor(
    private contactService: ContactService,
    private formService: FormService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.selectedFormObjectId =
      localStorage.getItem("selectedFormObjectId") || "";

    if (this.selectedFormObjectId) {
      this.fetchFormById(this.selectedFormObjectId);
    }

    this.formData = this.fb.group({});
  }

  fetchFormById(formObjectId: string): void {
    this.formService.getFormById(formObjectId).subscribe(
      (form) => {
        this.formSchema = form;
        this.selectedFormName = form.name;
        this.createFormControls(form.view.schema.tabs);
      },
      (error) => {
        console.error("Error fetching form by ID:", error);
      }
    );
  }

  createFormControls(tabs: any[]): void {
    const group: { [key: string]: any } = {};

    tabs.forEach((tab) => {
      tab.fields.forEach((field: any) => {
        const validators = this.getValidators(field.rules);
        group[field.name] = [field.value || "", validators];
      });
    });

    this.formData = this.fb.group(group);
  }

  getValidators(rules: any[]): any[] {
    const validators: any[] = [];
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
    return validators;
  }

  onSubmit(): void {
    if (this.formData.valid) {
      const formDataToSubmit = { ...this.formData.value };

      this.contactService.createContact(formDataToSubmit).subscribe(
        (response) => {
          console.log("Contact data saved successfully:", response);
          alert("Contact added successfully!");
          this.resetForm();
        },
        (error) => {
          console.error("Error saving contact data:", error);
          alert("Error saving contact!");
        }
      );
    } else {
      alert("Please fill out all required fields!");
    }
  }

  resetForm(): void {
    this.formData.reset();
  }
}
