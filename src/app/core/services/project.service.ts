import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Project, ProjectIndex } from '../models/catalog/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly url = environment.baseURL + '/project';
  constructor(private http: HttpClient) { }

  saveChanges(data: Project): Observable<ProjectIndex> {
    if (data.id > 0) {
      return this.http.put<ProjectIndex>(this.url + '/' + data.id, data);
    } else {
      return this.http.post<ProjectIndex>(this.url, data);
    }
  }

  getById(id: number): Observable<Project> {
    return this.http.get<Project>(this.url + '/' + id);
  }

  getAll(): Observable<ProjectIndex[]> {
    return this.http.get<ProjectIndex[]>(this.url);
  }
}
