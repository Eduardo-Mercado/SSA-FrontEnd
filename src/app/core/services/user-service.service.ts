import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OptionApp } from '../models/security/menu.model';
import { User, UserItem } from '../models/security/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private Url = environment.baseURL + '/Security';

  constructor(private http: HttpClient) {

  }

 getUsers(): Observable<UserItem[]>{
   return this.http.get<UserItem[]>(this.Url);
 }

 getUserById(id: number): Observable<User> {
   return this.http.get<User>(this.Url + '/' + id);
 }

 create(record: User): Observable<UserItem> {
   return this.http.post<UserItem>(this.Url, record);
 }

 update(record: User): Observable<UserItem> {
   return this.http.put<UserItem>(this.Url + '/' + record.id, record);
 }

 delete(id: number): Observable<boolean> {
   return this.http.delete<boolean>(this.Url + '/' + id);
 }

 getOptionsOfUserID(id: number): Observable<OptionApp[]> {
    return this.http.get<OptionApp[]>(this.Url + '/getOption' + id);
 }

 getCurrentUser(): Observable<any> {
   // return this.currentUserSubject.value;
   return JSON.parse(localStorage.getItem('prv'));
 }
}
