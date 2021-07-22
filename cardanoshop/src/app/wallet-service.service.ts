import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from './../environments/environment';
import { SessionStorage } from './helpers/session-storage';


@Injectable({
  providedIn: 'root'
})
export class WalletServiceService {

  constructor(private http: HttpClient, 
    public environment: SessionStorage) { }

  getMnemonic() {
    let headers = this.environment.headers
    return this.http.get<[String]>(`${environment.node_url}/mnemonic`, { headers });
  }
}
