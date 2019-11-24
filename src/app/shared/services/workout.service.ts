import { Injectable } from "@angular/core";

import { Workout } from '../models/workout.model';
import { ExerciseService } from './exercise.service';
import { deepClone } from '../utils/deep-clone';
import { Exercise } from '../models/exercise.model';

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
    return deepClone(this.workouts);
  }

  getWorkout(id: string): Workout {
    return deepClone(this.workouts.find((workout) => id === workout.id));
  }

  getLastWorkout(): Workout {
    return deepClone(this.workouts[this.workouts.length - 1]);
  }

  getOwnExercises(id: string): Array<Exercise> {
    return deepClone(this.exerciseService.getExercises()
      .filter((exercise) => this.getWorkout(id)
        .exercisesIdList.includes(exercise.id)));
  }

  setWorkoutCompleted(id: string, succeeded: boolean) {
    this.workouts = this.workouts.map((workout) => {
      id === workout.id && (workout.status = { completed: true, succeeded });
      return workout;
    });
  }

}