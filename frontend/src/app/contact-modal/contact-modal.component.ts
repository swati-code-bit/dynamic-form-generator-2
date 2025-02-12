import { Component, Input } from "@angular/core";

@Component({
  selector: "app-contact-modal",
  templateUrl: "./contact-modal.component.html",
  styleUrls: ["./contact-modal.component.css"],
})
export class ContactModalComponent {
  @Input() selectedContact: any;

  objectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }
}
