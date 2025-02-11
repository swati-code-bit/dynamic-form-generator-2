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
import { NavbarComponent } from "./navbar/navbar.component";
import { AddContactComponent } from "./add-contact/add-contact.component";
import { TabsComponent } from "./tabs/tabs.component";
import { SetFormComponent } from './set-form/set-form.component';

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
    TabsComponent,
    SetFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
