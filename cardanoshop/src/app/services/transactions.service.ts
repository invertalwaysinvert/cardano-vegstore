import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SessionStorage } from '../helpers/session-storage';
import { Transaction } from './transaction';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient,
    public session: SessionStorage) { }

  getTransactions(email: string): Observable<[Transaction]> {
    let headers = this.session.headers
    return this.http.get<[Transaction]>(`${environment.node_url}/transactions?email=${email}`, { headers })
    .pipe(
      map(result => result)
    );
  }
}
