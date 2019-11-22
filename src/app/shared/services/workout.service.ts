import { Injectable } from "@angular/core";

import { Workout } from '../models/workout.model';
import { Exercise } from '../models/exercise.model';
import { ExerciseService } from './exercise.service';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  workouts: Array<Workout> = [];

  constructor(private exerciseService: ExerciseService) { }

  addWorkout(workout: Workout) {
    this.workouts.push(workout);
  }

  getWorkouts(): Array<Workout> {
    return this.workouts.slice();
  }

  getWorkout(id: string): Workout {
    return this.workouts.find((workout) => id === workout.id);
  }

  getOwnExercises(id: string): Array<Exercise> {
    const exerciseIds: Array<string> = this.getWorkout(id)
      .exercisesIdList;
    return this.exerciseService.getExercises()
      .filter((exercise) => exerciseIds.includes(exercise.id));
  }
}