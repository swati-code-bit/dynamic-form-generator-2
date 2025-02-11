import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormGeneratorComponent } from "./form-generator/form-generator.component";
import { AddContactComponent } from "./add-contact/add-contact.component";
import { SetFormComponent } from "./set-form/set-form.component";

const routes: Routes = [
  { path: "generate-form", component: FormGeneratorComponent },
  { path: "add-contact", component: AddContactComponent },
  {path:"set-form",component:SetFormComponent},
  { path: "", redirectTo: "/generate-form", pathMatch: "full" }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
