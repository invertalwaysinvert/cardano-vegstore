import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class SessionStorage {

  private _currentUser: string = null;
  private _accessToken: string = null;
  private _headers: HttpHeaders = null;
  
  get currentUser(): string {    
    let customer = sessionStorage.getItem('currentUser')
    if (customer) {
      return JSON.parse(customer)
    }
    return null
  }

  set currentUser(value: string) {
    this._currentUser = value
    sessionStorage.setItem('currentUser', JSON.stringify(value))
  }

  get accessToken(): string {
    if (environment.production == false) {
      return localStorage.getItem('accessToken');
    }
    return sessionStorage.getItem('accessToken')
  }

  set accessToken(value: string) {
    this._accessToken = value
    if (environment.production == false) {
      localStorage.setItem('accessToken', value);
    }
    sessionStorage.setItem('accessToken', value)
  }

  set headers(value: HttpHeaders) {
    this._headers = value
  }

  get headers(): HttpHeaders {
    if (environment.production == false) {
      var accessToken = localStorage.getItem('accessToken');
      let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + accessToken)
      .set('Content-Type', 'application/json')
      return headers
    }
    return this._headers
  }
}