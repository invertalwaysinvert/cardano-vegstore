import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { SessionStorage } from '../helpers/session-storage';
import { NetworkInformation } from './network-information';


@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http: HttpClient, 
    public session: SessionStorage) { }

  getMnemonic() {
    let headers = this.session.headers
    return this.http.get<[String]>(`${environment.node_url}/mnemonic`, { headers });
  }

  getNetworkInformation(): Observable<NetworkInformation> {
    let headers = this.session.headers
    return this.http.get<NetworkInformation>(`${environment.node_url}/network/information`, { headers })
    .pipe(
      map(result => result)
    );
  }
}
