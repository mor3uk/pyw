import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../../auth/auth.service';

export interface CanDeactivateComponent {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean,
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<CanDeactivateComponent> {
  isAuth: boolean = true;

  constructor(private authService: AuthService) {
    authService.user.subscribe((user) => this.isAuth = !!user);
  }

  canDeactivate(
    component: CanDeactivateComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.isAuth) {
      return true;
    }
    return component.canDeactivate();
  }
}