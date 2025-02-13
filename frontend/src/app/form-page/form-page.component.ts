import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormService } from "../services/form.service";

@Component({
  selector: "app-form-page",
  templateUrl: "./form-page.component.html",
  styleUrls: ["./form-page.component.css"],
})
export class FormPageComponent implements OnInit {
  formId: string | null = null;
  formSchema: any = {};

  constructor(
    private route: ActivatedRoute,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
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
      },
      (error) => {
        console.error("Error fetching form schema:", error);
      }
    );
  }
}
