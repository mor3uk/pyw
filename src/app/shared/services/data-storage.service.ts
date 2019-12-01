import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Workout } from '../models/workout.model';
import { Exercise } from '../models/exercise.model';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient) { }

  loadWorkouts() {
    return this.http.get<Workout[]>('https://apyw-27a49.firebaseio.com/workouts.json');
  }

  saveWorkouts(workouts) {
    return this.http.put('https://apyw-27a49.firebaseio.com/workouts.json', workouts)
      .subscribe((data) => { });
  }

  loadExercises() {
    return this.http.get<Exercise[]>('https://apyw-27a49.firebaseio.com/exercises.json');
  }

  saveExercises(exercises) {
    return this.http.put('https://apyw-27a49.firebaseio.com/exercises.json', exercises)
      .subscribe((data) => { });
  }

  loadResults() {
    return this.http.get<Result[]>('https://apyw-27a49.firebaseio.com/results.json');
  }

  saveResults(results) {
    return this.http.put('https://apyw-27a49.firebaseio.com/results.json', results)
      .subscribe((data) => { });
  }

}