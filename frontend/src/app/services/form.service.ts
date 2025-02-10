import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FormService {
  private apiUrl = "http://localhost:3000/api/forms";

  constructor(private http: HttpClient) {}

  saveForm(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save-form`, formData);
  }

  getFormNames(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-forms`);
  }

  getFormById(formId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${formId}`);
  }
}
