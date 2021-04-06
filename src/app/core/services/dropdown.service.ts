import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DropDown } from '../models/dropwdonw.model';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  private readonly url = environment.baseURL + '/DropDown';
  constructor(private http: HttpClient) { }

  getCoworker() {
    return this.http.get<DropDown[]>(this.url + '/getCoworker');
  }

  getRolCoworkerProject() {
    return this.http.get<DropDown[]>(this.url + '/getRolCoworkerProject');
  }

  getTeamProject(idProject: number) {
    return this.http.get<DropDown[]>(this.url + '/getTeamProject/' + idProject);
  }

  getCategoryActivities() {
    return this.http.get<DropDown[]>(this.url + '/getCategoryActivities');
  }

  getCategoryTasks() {
    return this.http.get<DropDown[]>(this.url + '/getCategoryTask');
  }

  getRolApp() {
    return this.http.get<DropDown[]>(this.url + '/getRolsApp');
  }
}
