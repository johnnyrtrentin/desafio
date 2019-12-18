import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ListModel } from '../models/list-create.model';

import { AuthenticationService } from '../services/authetication.service';

@Injectable({
  providedIn: 'root'
})
export class ManipulateListsService {

  private tasksURL = '/tasks/api/v1/lists/';
  
  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  createList(list: ListModel): Observable<ListModel> {
    return this.http.post<ListModel>(this.tasksURL, list, this.httpHeader)
      .pipe(retry(3));
  }

  //TODO
  // updateList(): Observable<object> {}
  // deleteList(): Observable<object> {}
  // editList(): Observable<object> {}
}
