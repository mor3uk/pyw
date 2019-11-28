import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import moment from 'moment';
import uuid from 'uuid';

import { Workout } from '../models/workout.model';
import { ExerciseService } from './exercise.service';
import { Exercise } from '../models/exercise.model';
import { Filters } from '../models/filters.model';
import { ResultsService } from './results.service';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  workouts: Workout[] = [];
  workoutFiltersChanged = new Subject<Filters>();
  workoutWasRemoved = new Subject();

  constructor(
    private exerciseService: ExerciseService,
    private resultsService: ResultsService,
  ) {
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

  addWorkout(muscleGroup: string, roundsNumber: number) {
    const exercisesIdList: string[] = this.exerciseService
      .currentExercises.map((exercise) => exercise.id);
    const workout = {
      id: uuid(),
      muscleGroup: muscleGroup || '',
      createdAt: +moment(),
      roundsNumber,
      exercisesIdList,
      status: {
        completed: false,
        succeeded: false,
      }
    }
    this.workouts.push(workout);

    this.exerciseService.saveExercises();
    this.exerciseService.emptyCurrentExercises();

    localStorage.setItem('workouts', JSON.stringify(this.workouts));
  }

  getWorkouts(): Workout[] {
    return this.workouts;
  }

  getWorkout(id: string): Workout {
    return this.workouts.find((workout) => id === workout.id);
  }

  getFilteredWorkouts(filters: Filters = {}) {
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
          return b.duration - a.duration;
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
    this.resultsService.removeResult(id);
    this.workoutWasRemoved.next();

    localStorage.setItem('workouts', JSON.stringify(this.workouts));
  }

  getOwnExercises(id: string): Exercise[] {
    return this.exerciseService.getExercises()
      .filter((exercise) => this.getWorkout(id)
        .exercisesIdList.includes(exercise.id));
  }

  setWorkoutCompleted(id: string, succeeded: boolean, duration: number) {
    this.workouts.forEach((workout, i) => {
      if (workout.id === id) {
        this.workouts[i].status = { completed: true, succeeded };
        this.workouts[i].completedAt = +moment();
        this.workouts[i].duration = duration;
      }
    })

    localStorage.setItem('workouts', JSON.stringify(this.workouts));
  }
}