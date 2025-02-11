import { Component, OnInit } from "@angular/core";
import { FormService } from "../services/form.service";

@Component({
  selector: "app-set-form",
  templateUrl: "./set-form.component.html",
  styleUrls: ["./set-form.component.css"],
})
export class SetFormComponent implements OnInit {
  formList: any[] = [];
  selectedFormObjectId: string = "";
  selectedFormName: string = "";

  constructor(private formService: FormService) {}
  ngOnInit(): void {
    this.formService.getForms().subscribe(
      (forms) => {
        this.formList = forms;
      },
      (error) => {
        console.error("Error fetching form names:", error);
      }
    );

    const storedFormObjectId = localStorage.getItem("selectedFormObjectId");
    if (storedFormObjectId) {
      this.selectedFormObjectId = storedFormObjectId;
      this.setSelectedFormName(storedFormObjectId);
    }
  }

  onFormSelect(formObjectId: string): void {
    this.selectedFormObjectId = formObjectId;

    localStorage.setItem("selectedFormObjectId", formObjectId);
    this.setSelectedFormName(formObjectId);
  }

  setSelectedFormName(formObjectId: string): void {
    const selectedForm = this.formList.find(
      (form) => form._id === formObjectId
    );

    this.selectedFormName = selectedForm ? selectedForm.name : "";
  }
}
