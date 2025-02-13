import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Field } from "../../models/field.interface";

@Component({
  selector: "app-radio",
  templateUrl: "./radio.component.html",
})
export class RadioComponent implements OnInit {
  @Input() field!: Field;
  @Input() group!: FormGroup;
  options: string[] = []; 

  ngOnInit(): void {
    this.options = this.field.datasource || [];
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.group.get(fieldName);
    return control && control.touched && control.invalid;
  }
}
