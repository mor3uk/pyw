import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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

  constructor() {
    try {
      const resultsJSON = localStorage.getItem('results');
      if (resultsJSON) {
        this.results = JSON.parse(resultsJSON);
      } else {
        this.results = [];
      }
    } catch (e) {
      this.results = [];
    }
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

    localStorage.setItem('results', JSON.stringify(this.results));
  }

  removeResult(id: string) {
    this.results = this.results.filter((result) => id !== result.workoutId);
    
    localStorage.setItem('results', JSON.stringify(this.results));
  }

  getResult(id: string) {
    return this.results.find((result) => id === result.workoutId);
  }

}