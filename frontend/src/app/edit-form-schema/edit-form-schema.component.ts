import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormService } from "../services/form.service";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";

@Component({
  selector: "app-edit-form-schema",
  templateUrl: "./edit-form-schema.component.html",
  styleUrls: ["./edit-form-schema.component.css"],
})
export class EditFormSchemaComponent implements OnInit {
  formId: string | null = null;
  formSchema: any = {};
  editForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formService: FormService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.formId = params.get("formId");
      if (this.formId) {
        this.loadFormSchema(this.formId);
      } else {
        console.error("No formId found in route parameters");
      }
    });
  }

  loadFormSchema(formId: string): void {
    this.formService.getFormById(formId).subscribe(
      (data) => {
        this.formSchema = data;
        this.initializeForm();
      },
      (error) => {
        console.error("Error fetching form schema:", error);
      }
    );
  }

  initializeForm(): void {
    if (this.formSchema) {
      this.editForm = this.formBuilder.group({
        name: [this.formSchema.name, Validators.required],
        id: [this.formSchema.id, Validators.required],
        owner: [this.formSchema.owner, Validators.required],
        tabs: this.formBuilder.array([]),
      });

      this.formSchema.view.schema.tabs.forEach((tab: any) => {
        const tabGroup = this.formBuilder.group({
          name: [tab.name],
          text: [tab.text],
          fields: this.formBuilder.array(
            tab.fields.map((field: any) => this.createFieldGroup(field))
          ),
        });

        (this.editForm.get("tabs") as FormArray).push(tabGroup);
      });
    }
  }

  createFieldGroup(field: any): FormGroup {
    const baseGroup = this.formBuilder.group({
      name: [field.name, Validators.required],
      text: [field.text, Validators.required],
      widget: [field.widget, Validators.required],
      mandatory: [field.mandatory || false],
      validation: this.formBuilder.group({
        required: [(field.validation && field.validation.required) || false],
        message: [(field.validation && field.validation.message) || ""],
      }),
    });

    if (field.widget === "radio" || field.widget === "combo") {
      baseGroup.addControl(
        "options",
        this.formBuilder.array(
          (field.options &&
            field.options.map((opt: any) => this.createOptionGroup(opt))) ||
            []
        )
      );
    }

    if (field.widget === "numberfield") {
      baseGroup.addControl(
        "numericValidation",
        this.formBuilder.group({
          min: [
            (field.numericValidation && field.numericValidation.min) || null,
          ],
          max: [
            (field.numericValidation && field.numericValidation.max) || null,
          ],
        })
      );
    }

    return baseGroup;
  }

  createOptionGroup(option: any = {}): FormGroup {
    return this.formBuilder.group({
      label: [option.label || "", Validators.required],
      value: [option.value || "", Validators.required],
    });
  }

  setWidgetType(
    tabIndex: number,
    fieldIndex: number,
    widgetType: string
  ): void {
    const field = this.getField(tabIndex, fieldIndex);
    const widgetField = field.get("widget");
    if (widgetField) {
      widgetField.setValue(widgetType);
    }
  }

  addField(tabIndex: number, type: string): void {
    const fieldsArray = this.getFieldsArray(tabIndex);
    const newField = this.createFieldGroup({
      name: "",
      text: "",
      widget: type,
      mandatory: false,
    });
    fieldsArray.push(newField);
  }

  addOption(tabIndex: number, fieldIndex: number): void {
    const field = this.getField(tabIndex, fieldIndex);
    const optionsArray = field.get("options") as FormArray;
    optionsArray.push(this.createOptionGroup());
  }

  removeOption(
    tabIndex: number,
    fieldIndex: number,
    optionIndex: number
  ): void {
    const field = this.getField(tabIndex, fieldIndex);
    const optionsArray = field.get("options") as FormArray;
    optionsArray.removeAt(optionIndex);
  }

  removeField(tabIndex: number, fieldIndex: number): void {
    const fieldsArray = this.getFieldsArray(tabIndex);
    fieldsArray.removeAt(fieldIndex);
  }

  getFieldsArray(tabIndex: number): FormArray {
    return this.editForm.get(`tabs.${tabIndex}.fields`) as FormArray;
  }

  getField(tabIndex: number, fieldIndex: number): FormGroup {
    return this.getFieldsArray(tabIndex).at(fieldIndex) as FormGroup;
  }

  getOptions(tabIndex: number, fieldIndex: number): FormArray {
    return this.getField(tabIndex, fieldIndex).get("options") as FormArray;
  }

  submitForm(): void {
    // if (this.editForm.valid) {
    //   this.formService.updateForm(this.formId!, this.editForm.value).subscribe(
    //     () => {
    //       this.router.navigate(["/view-forms"]);
    //     },
    //     (error) => {
    //       console.error("Error updating form:", error);
    //     }
    //   );
    // }
  }

  cancel(): void {
    this.router.navigate(["/view-forms"]);
  }
}
