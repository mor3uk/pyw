import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from './data-storage.service';
import { Result } from '../models/result.model';
import { WorkoutState } from '../../workout/workout-train/workout-state.model';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  exerciseRoundAdded = new Subject<any[]>();
  exerciseRoundReseted = new Subject();
  results: Result[];
  currentResult: Result;
  groupI: number;
  roundCheck: number;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {
    authService.user.subscribe((user) => {
      if (!user) {
        return;
      }
      dataStorageService.loadResults().pipe(take(1))
        .subscribe((results) => {
          this.results = results || [];
        });
    })
  }

  initializeResult(id: string) {
    this.currentResult = { workoutId: id, exerciseRoundsGroups: [[null]] };
    this.groupI = -1;
    this.roundCheck = 1;
    this.exerciseRoundReseted.next();
  }

  addExerciseRound(workoutState: WorkoutState) {
    if (workoutState.exerciseFinishedRounds === 1) {
      this.groupI++;
      this.currentResult.exerciseRoundsGroups[this.groupI] = [null];
    }

    this.currentResult
      .exerciseRoundsGroups[this.groupI][workoutState.exerciseFinishedRounds - 1] = {
        exerciseId: workoutState.currentExercise.id,
        exerciseRound: workoutState.exerciseFinishedRounds,
        exerciseDuration: workoutState.workoutTimerValue,
        workoutRound: workoutState.workoutFinishedRounds + 1,
        actualUnitNumber: workoutState.currentUnitNumber,
      };

    this.exerciseRoundAdded.next(this.currentResult.exerciseRoundsGroups);
  }

  saveResult() {
    const i = this.results.findIndex((result) =>
      result.workoutId === this.currentResult.workoutId);
    if (i === -1) {
      this.results.push(this.currentResult);
    } else {
      this.results[i] = this.currentResult;
    }

    this.dataStorageService.saveResults(this.results);
  }

  removeResult(id: string) {
    this.results = this.results.filter((result) => id !== result.workoutId);

    this.dataStorageService.saveResults(this.results);
  }

  getResult(id: string) {
    return this.results.find((result) => id === result.workoutId);
  }

}