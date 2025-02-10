import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Field } from "../../models/field.interface";

@Component({
  selector: "app-combo",
  templateUrl: "./combo.component.html",
})
export class ComboComponent {
  @Input() field!: Field;
  @Input() group!: FormGroup;

  isFieldInvalid(fieldName: string): boolean {
    const control = this.group.get(fieldName);
    return control && control.touched && control.invalid;
  }
}
