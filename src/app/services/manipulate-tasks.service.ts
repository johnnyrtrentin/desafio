import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskModel } from '../models/task.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ManipulateTasksService {

  constructor(private http: HttpClient) { }

  private httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public createTask(id: string, body: TaskModel): Observable<TaskModel> {
    return this.http.post<TaskModel>(`/tasks/api/v1/lists/${id}/tasks`, body, this.httpHeaders);
  }
}

//passar o id da lista