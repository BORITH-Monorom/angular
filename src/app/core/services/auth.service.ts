import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4000/api/auth';

  private isLogged = new BehaviorSubject<boolean>(this.isLoggedIn())  //BehaviorSubject to store status
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) { }

    //Expose the login statusf as an observable
    isLoggedIn$ = this.isLogged.asObservable();

  //sign up method
  signUp(userData: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }

  //login method
  login(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData);
  }

  //Store JWT token in local storage
  setToken(token: string): void{
    localStorage.setItem('token', token);
    this.isLogged.next(true); // update login status
  }

  //Get the store token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  //Check if the user is logged in
  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  //Get user role from token
  getUserRole(): string | null{
    const token = this.getToken();
    if(token){
      const decodeToken = this.jwtHelper.decodeToken(token);
      console.log(decodeToken);
      console.log(decodeToken.user?.role, "is user?"); //output undefined 'is user
      return decodeToken.user?.role || null;
    }
    return null;
  }

  //logout
  logout():void{
    localStorage.removeItem('token');
    this.isLogged.next(false); // update login status
    this.router.navigate(['/login'])
  }
}
