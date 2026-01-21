import { HttpClient} from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, delay, map, Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Contact } from '../models/contact.model';



export function extract<T>(key: string){
  return map((res: any) => res[key] as T) // <softwareSkills[]>{}
}

export function handleResourceError(message = 'Something went wrong'){
  return catchError((err: unknown) =>{
    console.error('Resource load error:', err)
    return throwError(() => new Error(message))
  })
}
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private apiUrl = `${environment.apiUrl}`

constructor(private http: HttpClient) {
}


  software_Resource = rxResource({
    stream: () => this.http.get<any>(`${this.apiUrl}/software`)
  });


  findout_hrinc_Resource = rxResource({
    stream: () => this.http.get<any>(`${this.apiUrl}/findout_hrinc`)
  });

  contact_method_Resource = rxResource({
    stream: () => this.http.get<any>(`${this.apiUrl}/contact_method`)
  })

postMasterData(data:any){
  return this.http.post(`${this.apiUrl}/master_data`,data)
}

getLanguages(){
  return this.http.get<any[]>(`${this.apiUrl}/languages/`)
}

getLevel_Type(){
  return this.http.get<any[]>(`${this.apiUrl}/level_type`)
}


getContactId(id: string):Observable<any>{
  return this.http.get<Contact>(`${this.apiUrl}/contact/${id}`)
}

getContact(){
  return this.http.get<Contact[]>(`${this.apiUrl}/contact`).pipe(delay(1000));
}

deleteContact(id: string):Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}/contact/${id}`).pipe(delay(1000));
}

addContact(data: Contact){
  return this.http.post<Contact>(`${this.apiUrl}/contact/`, data).pipe(delay(1000))
}

updateContent(data: Contact){
  return this.http.patch<Contact>(`${this.apiUrl}/contact/${data.id}`, data).pipe(delay(1000))
}
addForm(data: any){
  return this.http.post<any>(`${this.apiUrl}/form`, data)
}

}

