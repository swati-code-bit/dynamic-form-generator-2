import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Field } from '../models/field.interface';

@Component({
  selector: 'app-form-generator',
  templateUrl: './form-generator.component.html'
})
export class FormGeneratorComponent implements OnInit {
  formData: FormGroup;
  formSchema: { fields: Field[] };
  jsonInput: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder) {
    this.formData = this.fb.group({});
    this.formSchema = { fields: [] };
  }

  ngOnInit(): void {
    this.formData = this.fb.group({});
  }

  generateForm(): void {
    try {
      this.formSchema = JSON.parse(this.jsonInput);

      if (!this.formSchema.fields || !Array.isArray(this.formSchema.fields)) {
        throw new Error('Invalid JSON format: Missing or invalid fields array');
      }

      const group: { [key: string]: FormControl } = {};

      this.formSchema.fields.forEach((field: Field) => {
        const validators = field.required ? [Validators.required] : [];
        group[field.name] = new FormControl(field.value || '', validators);
      });

      this.formData = this.fb.group(group);
      this.errorMessage = '';

      this.formData.valueChanges.subscribe(value => {
        console.log('Form values:', value);
      });

    } catch (error) {
      console.error('Error generating form:', error);
      this.errorMessage = `Error: ${error.message}`;
    }
  }
}