import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpParams
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const newRequest = req.clone({
          params: new HttpParams().set('auth', user.token)
        });
        return next.handle(newRequest);
      }));
  }
}