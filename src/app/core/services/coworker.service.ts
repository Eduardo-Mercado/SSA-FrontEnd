import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Coworker } from 'src/app/core/models/catalog/coworker.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoworkerService {

  private readonly url = environment.baseURL + '/Coworker';
  constructor(private http: HttpClient) { }

  getall() {
    return this.http.get<Coworker[]>(this.url);
  }

  saveChange(data: Coworker): Observable<Coworker> {
    if (data.id > 0) {
      return this.http.put<Coworker>(this.url + '/' + data.id, data);
    } else {
      return this.http.post<Coworker>(this.url, data);
    }
  }

  getById(id: number): Observable<Coworker> {
    return this.http.get<Coworker>(this.url + '/' + id);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.url + '/' + id);
  }
}
