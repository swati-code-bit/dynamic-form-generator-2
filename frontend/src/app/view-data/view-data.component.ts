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

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactService.getContacts().subscribe(
      (data) => {
        this.contacts = data.contacts || [];
        this.totalItems = this.contacts.length;
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

  get paginatedContacts(): any[] {
    const startIndex = (this.currentPage - 1) * +this.itemsPerPage;
    const endIndex = startIndex + +this.itemsPerPage;
    return this.contacts.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    const totalPages = this.totalPages;
    if (page >= 1 && page <= totalPages) {
      this.currentPage = page;
    }
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.contacts.length / +this.itemsPerPage));
  }

  onItemsPerPageChange(): void {
    this.itemsPerPage = +this.itemsPerPage;
    this.currentPage = 1;
  }
}
