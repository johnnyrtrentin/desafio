import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {

  private fluigURL = '/accounts/oauth/token?grant_type=password&response_type=token&client_id=demo';
  public token: string;

  constructor(private http: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({ Authorization: 'Basic ZGVtbzpzU2R4T1lEQU0zRkJO' })
  };

  generateToken(user: string, password: string): Observable<object> {
    return this.http.post<object>(this.fluigURL + `&username=${user}&password=${password}`, null, this.httpHeader)
      .pipe(map(tokenGenerated => {
        if (tokenGenerated !== undefined || tokenGenerated !== null) {
          return this.token = Object.values(tokenGenerated)[0];
        }
      }));
  }

  getToken(): string {
    return this.token;
  }
}
