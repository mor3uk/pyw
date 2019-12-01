import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../../auth/auth.service';
import { Workout } from '../models/workout.model';
import { Exercise } from '../models/exercise.model';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  userId: string = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
    this.authService.user.subscribe((user) => {
      if (user) {
        this.userId = user.id;
      }
    });
  }

  loadWorkouts() {
    return this.http.get<Workout[]>(`https://apyw-27a49.firebaseio.com/${this.userId}/workouts.json`);
  }

  saveWorkouts(workouts) {
    return this.http.put(`https://apyw-27a49.firebaseio.com/${this.userId}/workouts.json`, workouts)
      .subscribe((data) => { });
  }

  loadExercises() {
    return this.http.get<Exercise[]>(`https://apyw-27a49.firebaseio.com/${this.userId}/exercises.json`);
  }

  saveExercises(exercises) {
    return this.http.put(`https://apyw-27a49.firebaseio.com/${this.userId}/exercises.json`, exercises)
      .subscribe((data) => { });
  }

  loadResults() {
    return this.http.get<Result[]>(`https://apyw-27a49.firebaseio.com/${this.userId}/results.json`);
  }

  saveResults(results) {
    return this.http.put(`https://apyw-27a49.firebaseio.com/${this.userId}/results.json`, results)
      .subscribe((data) => { });
  }

}