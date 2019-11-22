import { Injectable } from "@angular/core";

import { Workout } from '../models/workout.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  workouts: Array<Workout> = [];

  addWorkout(workout: Workout) {
    this.workouts.push(workout);
  }

  getWorkouts(): Array<Workout> {
    return this.workouts.slice();
  }
}