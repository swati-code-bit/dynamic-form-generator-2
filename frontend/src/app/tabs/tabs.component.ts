import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-tabs",
  templateUrl: "./tabs.component.html",
  styleUrls: ["./tabs.component.css"],
})
export class TabsComponent {
  @Input() tabs: any[] = [];
  @Output() tabSelected = new EventEmitter<string>();

  activeTab: string = "";

  ngOnInit() {
    if (this.tabs.length > 0) {
      this.activeTab = this.tabs[0].id;
    }
  }

  selectTab(tabId: string, event: MouseEvent) {
    event.preventDefault();
    this.activeTab = tabId;
    this.tabSelected.emit(tabId);
  }
}
