import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService{
  private apiUrl = 'http://localhost:4000/api'; // Base URL for your API
  constructor(private http: HttpClient){}

  //Get the JWT token from localStorage
  private getAuthHeader(): HttpHeaders{
    const token = localStorage.getItem('token');
    if(token){
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }else{
      return new HttpHeaders()
    }
  }



  // Generic GET
  getAllPaginated(resource: string, page: number, limit: number, searchQuery:string = ''): Observable<any> {
    return this.http.get(`${this.apiUrl}/${resource}?page=${page}&limit=${limit}&search=${searchQuery}`);
  }

  getAll(resource:string): Observable<any>{
    return this.http.get(`${this.apiUrl}/${resource}`);
  }

  // Generic GET by ID method
  getById(resource:string, id:string): Observable<any>{
    return this.http.get(`${this.apiUrl}/${resource}/${id}`);
  }

  //Generic POST method
  create(resource:string, data:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/${resource}`, data,{headers: this.getAuthHeader()})
    .pipe(
      catchError(error =>{
      console.log(error)
      return throwError(() => new Error('Error creating resource', error));
    }));
  }

  //Generic Put method
  update(resource:string,id:string, data:any): Observable<any>{
    return this.http.put(`${this.apiUrl}/${resource}/${id}`, data,{headers: this.getAuthHeader()});
  }

  //Generic Delete method
  delete(resource:string,id:string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${resource}/${id}`,{headers: this.getAuthHeader()});
  }
}

