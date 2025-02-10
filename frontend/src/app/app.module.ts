import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { FormGeneratorComponent } from "./form-generator/form-generator.component";
import { AppRoutingModule } from "./app-routing.module";
import { TextfieldComponent } from "./widgets/textfield/textfield.component";
import { NumberfieldComponent } from "./widgets/numberfield/numberfield.component";
import { RadioComponent } from "./widgets/radio/radio.component";
import { ComboComponent } from "./widgets/combo/combo.component";
import { NavbarComponent } from './navbar/navbar.component';
import { AddContactComponent } from './add-contact/add-contact.component';

@NgModule({
  declarations: [
    AppComponent,
    TextfieldComponent,
    NumberfieldComponent,
    RadioComponent,
    ComboComponent,
    FormGeneratorComponent,
    NavbarComponent,
    AddContactComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,               // Template-driven forms (ngModel)
    ReactiveFormsModule,       // Reactive forms (FormControl, FormGroup, etc.)
    HttpClientModule,          // For making HTTP requests (optional if used)
    AppRoutingModule           // If you are using routing in your app
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
