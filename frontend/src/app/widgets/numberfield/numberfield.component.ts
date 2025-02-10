import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../../models/field.interface';

@Component({
  selector: 'app-numberfield',
  templateUrl: './numberfield.component.html'
})
export class NumberfieldComponent {
  @Input() field!: Field;
  @Input() group!: FormGroup;
}