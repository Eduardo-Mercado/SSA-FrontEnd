import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Activity, ActivityBackLog } from '../../models/project/activity.mdel';
import { ProjectInfo } from '../../models/project/projectIinfo.model';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  private readonly url = environment.baseURL + '/activity';
  constructor(private http: HttpClient) { }

  getProjectInfo(id: number): Observable<ProjectInfo> {
    return this.http.get<ProjectInfo>(this.url + '/getProjectInfo/' + id);
  }

  saveChanges(record: Activity) {
    if (record.id > 0) {
      return this.http.put<ActivityBackLog>(this.url + '/' + record.id, record);
    } else {
      return this.http.post<ActivityBackLog>(this.url, record);
    }
  }
}
