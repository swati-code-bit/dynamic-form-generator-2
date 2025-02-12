import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from '../services/form.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-edit-form-schema',
  templateUrl: './edit-form-schema.component.html',
  styleUrls: ['./edit-form-schema.component.css'],
})
export class EditFormSchemaComponent implements OnInit {
  formId: string | null = null;
  formSchema: any = {}; // to store the form schema fetched from the service
  editForm: FormGroup; // to store the reactive form

  constructor(
    private activatedRoute: ActivatedRoute,
    private formService: FormService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.formId = params.get("formId"); // get formId from URL params
      if (this.formId) {
        this.loadFormSchema(this.formId); // fetch form schema when formId is available
      } else {
        console.error("No formId found in route parameters");
      }
    });
  }

  loadFormSchema(formId: string): void {
    // Fetch form schema from the service based on the formId
    this.formService.getFormById(formId).subscribe(
      (data) => {
        this.formSchema = data; // store form schema
        this.initializeForm(); // initialize the form once data is fetched
      },
      (error) => {
        console.error("Error fetching form schema:", error);
      }
    );
  }

  initializeForm(): void {
    if (this.formSchema) {
      // Create the main form group
      this.editForm = this.formBuilder.group({
        name: [this.formSchema.name, Validators.required], // form field for 'name'
        id: [this.formSchema.id, Validators.required], // form field for 'id'
        owner: [this.formSchema.owner, Validators.required], // form field for 'owner'
        tabs: this.formBuilder.array([]), // initialize an empty array for tabs
      });

      // Iterate through tabs in the schema and create form groups for each
      this.formSchema.view.schema.tabs.forEach((tab: any) => {
        const tabGroup = this.formBuilder.group({
          name: [tab.name], // field for tab name
          text: [tab.text], // field for tab text
          fields: this.formBuilder.array(
            tab.fields.map((field: any) => this.createFieldGroup(field)) // map each field to a form group
          ),
        });

        // Push the tab group into the 'tabs' FormArray
        (this.editForm.get('tabs') as FormArray).push(tabGroup);
      });
    }
  }

  createFieldGroup(field: any): any {
    // Creates a form group for each field
    return this.formBuilder.group({
      name: [field.name], // field for name
      text: [field.text], // field for text (label)
      widget: [field.widget], // field for widget type
      type: [field.type], // field for field type
      mandatory: [field.mandatory], // field for mandatory checkbox
      value: [field.value], // initial value of the field
      rules: this.formBuilder.array(
        field.rules.map((rule: any) => this.createRuleGroup(rule)) // map each rule to a rule form group
      ),
    });
  }

  createRuleGroup(rule: any): any {
    // Creates a form group for each rule
    return this.formBuilder.group({
      type: [rule.type], // field for rule type
      value: [rule.value], // field for rule value
      message: [rule.message], // field for rule message
    });
  }

  submitForm(): void {
    if (this.editForm.valid) {
      console.log('Form submitted:', this.editForm.value); // you can submit the form data to your API here
      this.formService.updateForm(this.formId, this.editForm.value).subscribe(
        () => {
          this.router.navigate(['/view-forms']); // navigate back to view forms after submission
        },
        (error) => {
          console.error('Error updating form:', error);
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/view-forms']); // navigate back if the user clicks cancel
  }
}
