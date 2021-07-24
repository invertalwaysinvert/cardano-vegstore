import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { Router } from '@angular/router';
import { SessionStorage } from './session-storage';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, public session: SessionStorage) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((err, caught: Observable<HttpEvent<any>>) => {
          if (err instanceof HttpErrorResponse && (err.status == 401 || err.status == 403)) {
            alert('Your session has expired.')
            this.session.accessToken = null
            this.session.headers = null
            this.session.currentUser = null
            this.router.navigate([''], { queryParams: { returnUrl: request.url } });
            return of(err as any);
          }
          throw err;
        })
      );
  }
}