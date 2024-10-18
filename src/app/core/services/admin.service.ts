import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = `${environment.apiUrl}/api/auth/users`
  constructor(private http: HttpClient) { }

  //Update user role
  updateUserRole(userId: string, role: string): Observable<any>{
    return this.http.put(`${this.apiUrl}/${userId}/role`,{role});
  }
}
