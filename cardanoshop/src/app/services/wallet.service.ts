import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { SessionStorage } from '../helpers/session-storage';
import { NetworkInformation } from './network-information';
import { Wallet } from './wallet';


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

  createWallet(wallet: Wallet): Observable<boolean> {
    let headers = this.session.headers
    return this.http.post<boolean>(`${environment.node_url}/wallets`, 
    {name:wallet.name, mnemonic_sentence: wallet.mnemonic, passphrase: wallet.password, address_pool_gap: 20}, 
    { headers })
    .pipe(
      map(result => true)
    );
  }
}
