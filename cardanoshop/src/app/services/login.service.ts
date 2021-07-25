import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SessionStorage } from '../helpers/session-storage';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
    public session: SessionStorage) { }

  login(email: string) {
    return this.http.post(`${environment.node_url}/login`, {email: email})
      .pipe(map((data: any) => {
        this.session.accessToken = data.accessToken
        let headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + data.accessToken)
        .set('Content-Type', 'application/json')
        this.session.headers = headers
        if (environment.production == false) {
          localStorage.setItem('accessToken', data.accessToken);
        }
        return data.accessToken
      }));
  }
}
