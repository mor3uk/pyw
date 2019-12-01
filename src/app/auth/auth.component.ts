import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService, AuthResponse } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  signInMode: boolean = true;
  signForm: FormGroup;
  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.signForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]),
    });
  }

  onSwitchMode() {
    this.signInMode = !this.signInMode;
  }

  onSubmit() {
    if (this.signForm.invalid) {
      return;
    }
    let signObservable: Observable<AuthResponse>;

    if (this.signInMode) {
      signObservable = this.authService
        .signIn(this.signForm.value.email, this.signForm.value.password);
    } else {
      signObservable = this.authService
        .signUp(this.signForm.value.email, this.signForm.value.password);
    }

    signObservable.subscribe((data) => {
      this.error = null;
      this.router.navigate(['workouts', 'exercises']);
    }, (errorMessage) => {
      this.error = errorMessage;
      this.signForm.reset();
    });

  }

}
