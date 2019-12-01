import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  authSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.user
      .subscribe((user) => this.isAuthenticated = !!user);
  }

  onSignOut() {
    if (confirm('Are you sure you want to sign out?')) {
      this.authService.signOut();
    }
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
