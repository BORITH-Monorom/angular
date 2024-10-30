import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/auth`;

  private isLogged = new BehaviorSubject<boolean>(this.isLoggedIn())  //BehaviorSubject to store status
  private userRole = new BehaviorSubject<string | null>(this.getUserRoleFromToken());
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
   }

    //Expose the login statusf as an observable
    isLoggedIn$ = this.isLogged.asObservable();
    // expose the user role as an asobservable
    userRole$ = this.userRole.asObservable();

  //sign up method
  signUp(userData: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/signup`, userData);
  }

  //login method
  login(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData);
  }

  getUsers(): Observable<any>{
    return this.http.get(`${this.apiUrl}/users`);
  }

  //Store JWT token in local storage
  setToken(token: string): void{
    localStorage.setItem('token', token);
    this.isLogged.next(true); // update login status
    this.userRole.next(this.getUserRoleFromToken());
  }

  //Get the store token
  getToken(): string | null {
    console.log(localStorage.getItem('token'),"get token");
    return localStorage.getItem('token');
  }

  //Check if the user is logged in
  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  getUserName(){
    const token = this.getToken();
    if(token){
      const decodeToken = this.jwtHelper.decodeToken(token);
      console.log(decodeToken.user?.name,'what is user?')
      return decodeToken.user?.name || null;
    }
  }

  getUserRoleFromToken(){
    const token = this.getToken();
    if(token){
      const decodeToken = this.jwtHelper.decodeToken(token);
      return decodeToken.user?.role || null;
    }
    return null;
  }

  //Get user role from token
  // getUserRole():Observable<string | null>{
  //   return this.userRole$;
  // }

  //logout
  logout():void{
    localStorage.removeItem('token');
    this.isLogged.next(false); // update login status
    this.userRole.next(null);
    this.router.navigate(['/login'])
  }
}
