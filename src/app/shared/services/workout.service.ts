import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import moment from 'moment';

import { Workout } from '../models/workout.model';
import { ExerciseService } from './exercise.service';
import { Exercise } from '../models/exercise.model';
import { WorkoutFilters } from '../models/workout-filters.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  workouts: Array<Workout> = [];
  workoutFiltersChanged = new Subject<WorkoutFilters>();
  workoutWasRemoved = new Subject();

  constructor(private exerciseService: ExerciseService) {
    try {
      const workoutsJSON = localStorage.getItem('workouts');
      if (workoutsJSON) {
        this.workouts = JSON.parse(workoutsJSON);
      } else {
        this.workouts = [];
      }
    } catch (e) {
      this.workouts = [];
    }
  }

  addWorkout(muscleGroup: string, rounds: number) {
    const listIds: string[] = this.exerciseService
      .currentExercises.map((exercise) => exercise.id);
    const workout = new Workout(muscleGroup, rounds, listIds);
    this.workouts.push(workout);

    this.exerciseService.saveExercises();
    this.exerciseService.emptyCurrentExercises();

    localStorage.setItem('workouts', JSON.stringify(this.workouts));
  }

  getWorkouts(): Array<Workout> {
    return this.workouts;
  }

  getWorkout(id: string): Workout {
    return this.workouts.find((workout) => id === workout.id);
  }

  getFilteredWorkouts(filters: WorkoutFilters = {}) {
    return this.workouts.filter((workout) => {
      let muscleGroupMatch = true;
      let statusMatch = true;
      let succeededMatch = true;

      if (filters.muscleGroup) {
        muscleGroupMatch = workout.muscleGroup.toLowerCase()
          .includes(filters.muscleGroup.toLowerCase());
      }
      if (filters.status !== null) {
        statusMatch = workout.status.completed === filters.status;
      }
      if (filters.succeeded !== null) {
        succeededMatch = workout.status.succeeded === filters.succeeded
          && workout.status.completed;
      }

      return muscleGroupMatch && statusMatch && succeededMatch;
    }).sort((b, a) => {
      switch (filters.sortBy) {
        case 'date-creation':
          return a.createdAt - b.createdAt;
        case 'date-completion':
          return a.completedAt - b.completedAt;
        case 'time-completion':
          return a.workoutTime - b.workoutTime;
      }
      return 1;
    })
  }

  getLastWorkout(): Workout {
    return this.workouts[this.workouts.length - 1];
  }

  removeWorkout(id: string) {
    this.exerciseService.removeExercisesByIdList(
      this.getWorkout(id).exercisesIdList
    );
    this.workouts = this.workouts.filter((workout) => workout.id !== id);
    this.workoutWasRemoved.next();

    localStorage.setItem('workouts', JSON.stringify(this.workouts));
  }

  getOwnExercises(id: string): Array<Exercise> {
    return this.exerciseService.getExercises()
      .filter((exercise) => this.getWorkout(id)
        .exercisesIdList.includes(exercise.id));
  }

  setWorkoutCompleted(id: string, succeeded: boolean, workoutTime: number) {
    this.workouts = this.workouts.map((workout) => {
      if (id === workout.id) {
        workout.status = { completed: true, succeeded };
        workout.completedAt = +moment();
        workout.workoutTime = workoutTime;
      }
      return workout;
    });

    localStorage.setItem('workouts', JSON.stringify(this.workouts));
  }
}