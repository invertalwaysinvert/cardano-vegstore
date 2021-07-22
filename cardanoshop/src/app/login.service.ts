import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SessionStorage } from './helpers/session-storage';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
    public environment: SessionStorage) { }

  login(email: string) {
    return this.http.post(`${environment.node_url}/login`, {email: email})
      .pipe(map((data: any) => {
        this.environment.accessToken = data.accessToken
        let headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + data.accessToken)
        .set('Content-Type', 'application/json')
        this.environment.headers = headers
        return data.accessToken
      }));
  }
}
