import { Injectable } from "@angular/core";

import { Workout } from '../models/workout.model';
import { ExerciseService } from './exercise.service';
import { deepClone } from '../utils/deep-clone';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  workouts: Array<Workout> = [];

  constructor(private exerciseService: ExerciseService) { }

  addWorkout(workout: Workout) {
    this.exerciseService.saveExercises();
    this.exerciseService.emptyCurrentExercises();
    this.workouts.push(workout);
  }

  getWorkouts(): Array<Workout> {
    return this.workouts.slice();
  }

  getWorkout(id: string): Workout {
    return this.workouts.find((workout) => id === workout.id);
  }

  getLastWorkout(): Workout {
    return this.workouts[this.workouts.length - 1];
  }

  getOwnExercises(id: string) {
    return deepClone(this.exerciseService.getExercises()
      .filter((exercise) => this.getWorkout(id)
        .exercisesIdList.includes(exercise.id)));
  }

}