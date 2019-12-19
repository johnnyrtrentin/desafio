import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ListModel } from '../models/list.model';
import { ListModelInformation } from '../models/list-info.model';

@Injectable({ providedIn: 'root' })
export class ListsService {

  private tasksURL = '/tasks/api/v1/lists/';

  constructor(private http: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  createList(list: ListModel): Observable<ListModel> {
    return this.http.post<ListModel>(this.tasksURL, list, this.httpHeader)
      .pipe(retry(3));
  }

  getList(list: ListModelInformation): Observable<ListModel> {
    return this.http.get<ListModel>(`${this.tasksURL}/${list.id}`, this.httpHeader);
  }

  getAllLists(): Observable<ListModel> {
    return this.http.get<ListModel>(this.tasksURL, this.httpHeader);
  }

  editList(list: ListModelInformation, editedList: ListModel): Observable<ListModelInformation> {
    return this.http.put<ListModelInformation>(`${this.tasksURL}/${list.id}`, editedList, this.httpHeader);
  }
}
