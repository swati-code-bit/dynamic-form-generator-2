import { Component, OnInit } from "@angular/core";
import { ContactService } from "../services/contact.service";

@Component({
  selector: "app-view-data",
  templateUrl: "./view-data.component.html",
  styleUrls: ["./view-data.component.css"],
})
export class ViewDataComponent implements OnInit {
  contacts: any[] = [];
  errorMessage: string = "";
  selectedContact: any;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactService.getContacts().subscribe(
      (data) => {
        this.contacts = data.contacts || [];
      },
      (error) => {
        this.errorMessage = "Error loading contacts.";
        console.error(error);
      }
    );
  }

  setSelectedContact(contact: any): void {
    this.selectedContact = contact;
  }
}
