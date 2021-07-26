import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Currency } from './currency';

@Injectable({
  providedIn: 'root'
})
export class CoingeckoService {

  constructor(private http: HttpClient) { }

  getPrices(vs_currency: string) {
    return this.http.get<[Currency]>(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vs_currency}`);
  }
}
