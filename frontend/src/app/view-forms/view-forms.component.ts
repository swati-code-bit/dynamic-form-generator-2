import { Component, OnInit } from '@angular/core';
import { FormService } from '../services/form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-forms',
  templateUrl: './view-forms.component.html',
  styleUrls: ['./view-forms.component.css'],
})
export class ViewFormsComponent implements OnInit {
  forms: any[] = [];

  constructor(private formService: FormService, private router: Router) {}

  ngOnInit(): void {
    this.loadForms();
  }

  loadForms(): void {
    this.formService.getForms().subscribe(
      (data) => {
        this.forms = data;
      },
      (error) => {
        console.error('Error fetching forms:', error);
      }
    );
  }

  viewForm(formObjectId: any): void {
    console.log('Selected form:', formObjectId);
    if (formObjectId) {
      this.router.navigate(['/form', formObjectId]);
    } else {
      console.error('Form object does not have _id:', formObjectId);
    }
  }

  editForm(formObjectId: any): void {
    console.log('Edit form:', formObjectId);
    if (formObjectId) {
      this.router.navigate(['/edit-form', formObjectId]);
    } else {
      console.error('Form object does not have _id:', formObjectId);
    }
  }

  deleteForm(formObjectId: any): void {
    console.log('Delete form:', formObjectId);
    
  }
}
