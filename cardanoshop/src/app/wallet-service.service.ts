import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from './../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WalletServiceService {

  constructor(private http: HttpClient) { }

  getMnemonic() {
    return this.http.get<[String]>(`${environment.node_url}/mnemonic`);
  }
}
