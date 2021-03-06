import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

import moment from 'moment';
import uuid from 'uuid';

import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from './data-storage.service';
import { ResultsService } from './results.service';
import { ExerciseService } from './exercise.service';
import { Workout } from '../models/workout.model';
import { Exercise } from '../models/exercise.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  workouts: Workout[] = [];
  workoutsChanged = new Subject();

  constructor(
    private exerciseService: ExerciseService,
    private resultsService: ResultsService,
    private dataStorageService: DataStorageService,
    private authService: AuthService,
  ) {
    authService.user.subscribe((user) => {
      if (!user) {
        return;
      }
      dataStorageService.loadWorkouts().pipe(take(1))
        .subscribe((workouts) => {
          this.workouts = workouts || [];
          this.workoutsChanged.next();
        });
    });
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

    this.dataStorageService.saveWorkouts(this.workouts);
  }

  getWorkouts(): Workout[] {
    return this.workouts;
  }

  getWorkout(id: string): Workout {
    return this.workouts.find((workout) => id === workout.id);
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
    this.workoutsChanged.next();

    this.dataStorageService.saveWorkouts(this.workouts);
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

    this.dataStorageService.saveWorkouts(this.workouts);
  }
}