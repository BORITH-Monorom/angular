import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:4000/api/auth/users'
  constructor(private http: HttpClient) { }

  //Update user role
  updateUserRole(userId: string, role: string): Observable<any>{
    return this.http.put(`${this.apiUrl}/${userId}/role`,{role});
  }
}
