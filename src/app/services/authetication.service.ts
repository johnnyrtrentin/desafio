import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {

  private fluigURL = '/accounts/oauth/token?grant_type=password&response_type=token&client_id=demo';
  public token: string;

  constructor(private http: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({ Authorization: 'Basic ZGVtbzpzU2R4T1lEQU0zRkJO' })
  };

  public generateToken(user: string, password: string): Observable<object> {
    return this.http.post<object>(`${this.fluigURL}&username=${user}&password=${password}`, null, this.httpHeader)
      .pipe(map(tokenGenerated => {
        if (tokenGenerated !== undefined || tokenGenerated !== null) {
          return this.token = Object.values(tokenGenerated)[0];
        }
      }));
  }

  public getToken(): string {
    return this.token;
  }
}
