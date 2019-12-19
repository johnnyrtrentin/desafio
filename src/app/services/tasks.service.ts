import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskModel } from '../models/tasks.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ListModel } from '../models/list.model';

@Injectable({ providedIn: 'root' })
export class TasksService {

  constructor(private http: HttpClient) { }

  private tasksURL = '/tasks/api/v1/lists';
  private httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public createTask(id: string, body: TaskModel): Observable<TaskModel> {
    return this.http.post<TaskModel>(`/tasks/api/v1/lists/${id}/tasks`, body, this.httpHeaders);
  }

  public editTask(list: string, task: string, body: ListModel): Observable<TaskModel> {
    return this.http.put<TaskModel>(`${this.tasksURL}/${list}/tasks/${task}`, body, this.httpHeaders);
  }

  public getTask(list: string, task: string, body: ListModel): Observable<TaskModel> {
    return this.http.get<TaskModel>(`${this.tasksURL}/${list}/tasks/${task}`, this.httpHeaders);
  }

  public getAllTasks(list: string): Observable<TaskModel> {
    return this.http.get<TaskModel>(`${this.tasksURL}/${list}/tasks`, this.httpHeaders);
  }

  public removeTask(list: string, task: string): Observable<TaskModel> {
    return this.http.delete<TaskModel>(`${this.tasksURL}/${list}/tasks/${task}`, this.httpHeaders);
  }
}
