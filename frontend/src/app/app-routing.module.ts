import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormGeneratorComponent } from "./form-generator/form-generator.component";
import { AddContactComponent } from "./add-contact/add-contact.component";

const routes: Routes = [
  { path: "generate-form", component: FormGeneratorComponent },
  { path: "add-contact", component: AddContactComponent },
  { path: "", redirectTo: "/generate-form", pathMatch: "full" }, // Redirect to Generate/Set Form by default
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
