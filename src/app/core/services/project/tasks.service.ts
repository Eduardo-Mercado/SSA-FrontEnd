import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActivityInfoSummary } from '../../models/project/activity.mdel';
import { TaskRecord } from '../../models/project/task.model';
import { Task } from '../../models/project/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private readonly url = environment.baseURL + '/task';
  constructor(private http: HttpClient) {

  }

  getSummaryTasks(idActivity: number): Observable<ActivityInfoSummary> {
    return this.http.get<ActivityInfoSummary>(this.url + '/' + idActivity);
  }

  saveChanges(record: TaskRecord) {
    if (record.id > 0) {
      return this.http.put(this.url + '/' + record.id, record);
    } else {
      return this.http.post(this.url, record );
    }
  }

 getTaskById(idActivity: number, idTask: number) {
   return this.http.get<TaskRecord>(this.url + '/getTaskInfo/idActivity=' + idActivity + '&idTask=' + idTask);
 }

 authorizeTaks(record: Task[], idActivity: number) {
  const listTasks = record.map((data) =>  ({
    isAutorize: true,
    comentAutorize: '',
    id: data.id
  }));
  return this.http.put(this.url + '/authorization/' + idActivity,  listTasks );
 }
}
