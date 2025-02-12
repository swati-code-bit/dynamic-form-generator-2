import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-form-generator",
  templateUrl: "./form-generator.component.html",
  styleUrls: ["./form-generator.component.css"],
})
export class FormGeneratorComponent implements OnChanges {
  @Input() jsonSchema: any;
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
    if (this.jsonSchema && this.jsonSchema.view && this.jsonSchema.view.schema) {
      const group: { [key: string]: FormControl } = {};
      this.tabs = this.jsonSchema.view.schema.tabs;

      this.tabs.forEach((tab) => {
        if (Array.isArray(tab.fields)) {
          tab.fields.forEach((field: any) => {
            const validators = this.getValidators(field.rules);
            group[field.name] = new FormControl(field.value || "", validators);
          });
        }
      });

      this.formData = this.fb.group(group);

      if (this.tabs.length > 0) {
        this.selectedTabId = this.tabs[0].id;
      }
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

  selectTab(tabId: string, event: MouseEvent): void {
    event.preventDefault();
    this.selectedTabId = tabId;
  }
}
