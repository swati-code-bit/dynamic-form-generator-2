import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FormService {
  private apiUrl = "http://localhost:3000/api/forms";

  constructor(private http: HttpClient) {}

  saveForm(formSchema: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save-form`, formSchema);
  }

  getForms(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-forms`);
  }

  getFormById(formId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${formId}`);
  }

  deleteForm(formId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${formId}`);
  }
}
