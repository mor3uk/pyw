import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_KEY: string = 'AIzaSyDvcBHA2dO3ruWnLxKKzaNyAqPRiw7vRIg';
  user = new BehaviorSubject<User>(null);
  expireTimer = null;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return;
      }
      const user = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate),
      );

      if (user.token) {
        this.user.next(user);
        this.autoSignOut(+new Date(userData._tokenExpirationDate) - +new Date());
      }
    } catch (e) { }
  }

  signUp(email: string, password: string) {
    const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`;

    return this.http.post<AuthResponse>(endpoint, {
      email,
      password,
      returnSecureToken: true,
    }).pipe(catchError(this.handleError), tap((responseData) => {
      this.handleAuth(
        responseData.email,
        responseData.localId,
        responseData.idToken,
        responseData.expiresIn,
      );
    }));
  }

  signIn(email: string, password: string) {
    const endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`;

    return this.http.post<AuthResponse>(endpoint, {
      email,
      password,
      returnSecureToken: true,
    }).pipe(catchError(this.handleError), tap((responseData) => {
      this.handleAuth(
        responseData.email,
        responseData.localId,
        responseData.idToken,
        responseData.expiresIn,
      );
    }));
  }

  signOut() {
    this.user.next(null);
    this.router.navigate(['auth']);
    localStorage.removeItem('userData');
  }

  autoSignOut(expireTime) {
    this.expireTimer = setTimeout(this.signOut.bind(this), expireTime);
  }

  private handleError(error) {
    let errorMessage = 'An unknown error occured!';

    if (!error.error && !error.error.error) {
      return throwError(errorMessage);
    }

    switch (error.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'The email already exists!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'The user with this email was not found!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Wrong password entered!';
    }

    return throwError(errorMessage);
  }

  private handleAuth(email: string, id: string, token: string, expire: string) {
    const expireDate = new Date(+new Date() + +expire * 1000);
    const user = new User(email, id, token, expireDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoSignOut(+expire * 1000);
  }
}