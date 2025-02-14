import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-form-generator",
  templateUrl: "./form-generator.component.html",
  styleUrls: ["./form-generator.component.css"],
})
export class FormGeneratorComponent implements OnChanges {
  @Input() jsonSchema: any;
  @Output() formDataChanged = new EventEmitter<FormGroup>();

  formData: FormGroup;
  tabs: any[] = [];
  selectedTabId: string = "";

  constructor(private fb: FormBuilder) {
    this.formData = this.fb.group({});
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.jsonSchema && this.jsonSchema) {
      this.generateForm();
    }
  }

  generateForm(): void {
    const group: { [key: string]: FormControl } = {};
    this.tabs = [];

    if (
      this.jsonSchema &&
      this.jsonSchema.view &&
      this.jsonSchema.view.schema
    ) {
      if (
        Array.isArray(this.jsonSchema.view.schema.tabs) &&
        this.jsonSchema.view.schema.tabs.length > 0
      ) {
        this.tabs = this.jsonSchema.view.schema.tabs;
      } else if (Array.isArray(this.jsonSchema.view.schema.fields)) {
        this.tabs = [
          {
            name: "Main",
            text: "Main Form",
            id: "tab-001",
            fields: this.jsonSchema.view.schema.fields,
          },
        ];
      }

      this.tabs.forEach((tab) => {
        if (Array.isArray(tab.fields)) {
          tab.fields.forEach((field: any) => {
            const validators = this.getValidators(field);
            group[field.name] = new FormControl(field.value || "", validators);
          });
        }
      });

      this.formData = this.fb.group(group);
      this.formDataChanged.emit(this.formData);

      if (this.tabs.length > 0) {
        this.selectedTabId = this.tabs[0].id;
      }
    } else {
      console.error("Invalid JSON format: Missing or malformed schema/view.");
    }
  }

  getValidators(field: any): any[] {
    const validators: any[] = [];

    if (field.mandatory) {
      validators.push(Validators.required);
    }
    if (field.maxLength) {
      validators.push(Validators.maxLength(field.maxLength));
    }
    if (field.minLength) {
      validators.push(Validators.minLength(field.minLength));
    }
    if (field.pattern) {
      const pattern = Array.isArray(field.pattern)
        ? field.pattern.join("|")
        : field.pattern;
      validators.push(Validators.pattern(pattern));
    }
    if (field.type === "email") {
      validators.push(Validators.email);
    }

    return validators.length > 0 ? validators : null;
  }

  selectTab(tabId: string, event: MouseEvent): void {
    event.preventDefault();
    this.selectedTabId = tabId;
  }
}
