import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService{
  private apiUrl = 'http://localhost:3000/api'; // Base URL for your API
  constructor(private http: HttpClient){}

  // Generic GET
  getAll(resource:string): Observable<any>{
    return this.http.get(`${this.apiUrl}/${resource}`);
  }

  // Generic GET by ID method
  getById(resource:string): Observable<any>{
    return this.http.get(`${this.apiUrl}/${resource}`);
  }

  //Generic POST method
  create(resource:string, data:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/${resource}`, data);
  }

  //Generic Put method
  update(resource:string,id:string, data:any): Observable<any>{
    return this.http.put(`${this.apiUrl}/${resource}/${id}`, data);
  }

  //Generic Delete method
  delete(resource:string,id:string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${resource}/${id}`);
  }
}

