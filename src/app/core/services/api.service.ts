import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SliceResponse, Slide } from '../models/slide.model';
import { Maskmail } from '../models/maskmail.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService{
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
  private apiUrl_report = `${environment.apiUrl_maskmail_report}`
  private  apiUrl = `${environment.apiUrl}/api`; // Base URL for your API
  private token = 'bpYGCoEgs4cCKnBiKsSwU7Fw1oZ4zRny2eShMFGJKuTFWkC8LWuocBDUhrDG'
  private params = new HttpParams().set('api_token', this.token);

  banners = signal<any[]>([])
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


  getSlide(): Observable<Slide[]>{
    return this.http.get<Slide[]>(`${this.apiUrl}/slides`);
  }

  postSlide(data: FormData): Observable<SliceResponse>{
    return this.http.post<SliceResponse>(`${this.apiUrl}/slides`, data)

  }
  deleteSlide(id:any): Observable<Slide>{
    return this.http.delete<Slide>(`${this.apiUrl}/slides/${id}`)
  }

  getMaskmail():Observable<Maskmail[]>{
    return this.http.get<Maskmail[]>(`${this.apiUrl}/maskmails`);
  }
  postMaskmail(data:any): Observable<Maskmail>{
    return this.http.post<Maskmail>(`${this.apiUrl}/maskmails`, data)
  }
  deleteMaskmail(id:string): Observable<Maskmail>{
    return this.http.delete<Maskmail>(`${this.apiUrl}/maskmails/${id}`)
  }
  updateMaskmail(id:any, data:any): Observable<Maskmail>{
    return this.http.put<Maskmail>(`${this.apiUrl}/maskmails/${id}`,data)
  }

  // Fetch banners and update the signal
  getBanners() {
    this.http.get<any[]>(`${this.apiUrl}/banners`).subscribe((data) => {
      this.banners.set(data);
    });
  }
  postBanner(data:any){
    this.http.post<any>(`${this.apiUrl}/banners`,data).subscribe((res) =>{
      console.log(res,"....")
      this.banners.set(([...this.banners(), res])); //Add new banner to signal
    })
  }
  // Update a banner and update the signal
  updateBanner(id: any, data: any) {
    this.http.put<any>(`${this.apiUrl}/banners/${id}`, data).subscribe((response) => {
      const updatedBanners = this.banners().map((banner) =>
        banner.id === id ? response : banner
      );
      this.banners.set(updatedBanners); // Update the banner in the signal
    });
  }

  // Delete a banner and update the signal
  deleteBanner(id: any) {
    this.http.delete<any>(`${this.apiUrl}/banners/${id}`).subscribe(() => {
      const updatedBanners = this.banners().filter((banner) => banner._id !== id);
      this.banners.set(updatedBanners); // Remove the banner from the signal
    });
  }

  //Get all todos
  getTodos(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/todos`,{headers: this.getAuthHeader()});
  }

  addTodo(payload: {title:string}): Observable<any> {
    console.log("Adding Todo with payload:", payload);
    return this.http.post<any>(`${this.apiUrl}/todos`, payload, {headers: this.getAuthHeader()})
      .pipe(
        catchError((error) => {
          console.error("Error adding todo:", error);
          return this.handleError(error);
        })
      );
  }

  updateTodo(payload: { _id: string; title: string; completed: boolean }): Observable<any> {
    console.log("Updating Todo with ID:", payload.completed);
    return this.http.put<any>(
      `${this.apiUrl}/todos/${payload._id}`, // Pass payload._id here, not the entire object
      payload,
      { headers: this.getAuthHeader() }
    ).pipe(
      catchError(this.handleError)
    );
  }



  deleteTodo(id: string): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/todos/${id}`, {headers: this.getAuthHeader()})
    .pipe(catchError(this.handleError));
  }

  getCampaign(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl_report}/campaigns`, {params: this.params})
    .pipe(
      // tap(res => console.log(res))
  );
  }

  //Handle error for all requests
  private handleError(error: any){
    console.error('API Error:', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }
  }
