import { Component, OnInit } from "@angular/core";
import { FormService } from "../services/form.service";

@Component({
  selector: "app-set-form",
  templateUrl: "./set-form.component.html",
  styleUrls: ["./set-form.component.css"],
})
export class SetFormComponent implements OnInit {
  formList: any[] = [];  // Renamed from 'formNames' to 'formList'
  selectedFormObjectId: string = "";  // Renamed from 'selectedFormId' to 'selectedFormObjectId'
  selectedFormName: string = ""; 

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    // Fetch the form list (name and objectId) from the form service
    this.formService.getFormNames().subscribe(
      (forms) => {
        this.formList = forms;
      },
      (error) => {
        console.error("Error fetching form names:", error);
      }
    );

    // Check if there's a selected form object ID in localStorage.
    const storedFormObjectId = localStorage.getItem("selectedFormObjectId");
    if (storedFormObjectId) {
      this.selectedFormObjectId = storedFormObjectId; 
      this.setSelectedFormName(storedFormObjectId); 
    }
  }

  onFormSelect(formObjectId: string): void {
    this.selectedFormObjectId = formObjectId;
    // Save the selected form object ID (MongoDB _id) to localStorage.
    localStorage.setItem("selectedFormObjectId", formObjectId);
    this.setSelectedFormName(formObjectId); // Set the selected form name based on the selected object ID.
  }

  setSelectedFormName(formObjectId: string): void {
    // Find the form by the object ID (MongoDB _id).
    const selectedForm = this.formList.find((form) => form._id === formObjectId); 
    // Set the selected form name if found.
    this.selectedFormName = selectedForm ? selectedForm.name : ""; 
  }
}
