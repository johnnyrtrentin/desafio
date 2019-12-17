import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManipulateListsService {

  constructor(private http: HttpClient) { }

  private tasksURL = '/accounts/oauth/token?grant_type=password&response_type=token&client_id=demo';
  public token;

  httpHeader = {
    headers: new HttpHeaders({ Authorization: 'Basic ZGVtbzpzU2R4T1lEQU0zRkJO' })
  };

  doAuthentication(user: string, password: string): Observable<any> {
    return this.http.post<any>(this.tasksURL + `&username=${user}&password=${password}`, null, this.httpHeader)
      .pipe(retry(3));
  }
}
