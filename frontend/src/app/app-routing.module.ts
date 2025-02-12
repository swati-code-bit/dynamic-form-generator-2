import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddContactComponent } from "./add-contact/add-contact.component";
import { ViewFormsComponent } from "./view-forms/view-forms.component";
import { SetFormComponent } from "./set-form/set-form.component";
import { ViewDataComponent } from "./view-data/view-data.component";
import { GenerateFormPageComponent } from "./generate-form-page/generate-form-page.component";
import { FormPageComponent } from "./form-page/form-page.component";
import { EditFormSchemaComponent } from "./edit-form-schema/edit-form-schema.component";

const routes: Routes = [
  { path: "generate-form", component: GenerateFormPageComponent },
  { path: "add-contact", component: AddContactComponent },
  {path:"view-forms",component:ViewFormsComponent},
  { path: 'form/:formId', component: FormPageComponent },
  {path:'edit-form/:formId',component:EditFormSchemaComponent},
  {path:"set-form",component:SetFormComponent},
  {path:"view-data",component:ViewDataComponent},
  { path: "", redirectTo: "/generate-form", pathMatch: "full" }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
