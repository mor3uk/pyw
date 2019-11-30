import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ResultsService } from '../../shared/services/results.service';
import { WorkoutService } from '../../shared/services/workout.service';
import { WorkoutState } from './workout-state.model';

@Injectable()
export class WorkoutStateService {
  workoutStateReseted = new Subject<WorkoutState>();
  workoutState: WorkoutState;
  exerciseTimer;
  defaultWorkoutState: WorkoutState;
  currentExI: number = 0;
  workoutTimer;
  workoutDuration: number = 0;

  constructor(
    private resultsService: ResultsService,
    private workoutService: WorkoutService,
  ) { }

  getWorkoutState(): WorkoutState {
    return this.workoutState;
  }

  setDefaultWorkoutState(workoutState: WorkoutState) {
    this.workoutState = workoutState;
    this.defaultWorkoutState = { ...workoutState };
    this.workoutDuration = 0;
    this.resultsService.initializeResult(workoutState.id);
  }

  resetWorkoutState() {
    this.workoutState = { ...this.defaultWorkoutState };
    this.currentExI = 0;
    this.workoutStateReseted.next(this.workoutState);
    this.resultsService.initializeResult(this.workoutState.id);
    clearInterval(this.exerciseTimer);
  }

  pauseTimer() {
    clearInterval(this.exerciseTimer);
  }

  runTimer() {
    clearInterval(this.exerciseTimer);
    this.workoutState.workoutTimerValue = 0;
    this.exerciseTimer = setInterval(() =>
      this.workoutState.workoutTimerValue++, 1000);
  }

  rest() {
    this.workoutState.isSuccess = this.isSuccess();
    this.resultsService.addExerciseRound(this.workoutState);
    this.workoutState.currentUnitNumber = 1;

    if (
      this.workoutState.exerciseFinishedRounds
      === this.workoutState.currentExercise.roundsNumber
    ) {
      if (this.nextRoundCheck()) {
        return;
      }
      this.workoutState.exerciseFinishedRounds = 0;
    }

    this.runTimer();
  }

  roundsFinishedCheck(): boolean {
    const workout = this.workoutService.getWorkout(this.workoutState.id);

    if (this.workoutState.workoutFinishedRounds === workout.roundsNumber) {
      clearInterval(this.workoutTimer);
      return this.workoutState.workoutFinished = true;
    }
  }

  nextRoundCheck() {
    if (this.workoutState.exercises.length - 1 === this.currentExI) {
      this.workoutState.workoutFinishedRounds++;
      if (this.roundsFinishedCheck()) {
        return true;
      }
      this.workoutState.currentExercise = this.workoutState.exercises[0];
      this.currentExI = 0;

    } else {
      this.workoutState.currentExercise = this.workoutState.exercises[++this.currentExI];
    }
  }

  isSuccess() {
    return this.workoutState.currentUnitNumber
      >= this.workoutState.currentExercise.unitNumber;
  }

  startRound() {
    if (this.currentExI === 0
      && this.workoutState.workoutFinishedRounds === 0) {
      this.workoutTimer = setInterval(() => this.workoutDuration++, 1000);
    }
    this.runTimer();
  }

  save() {
    if (this.workoutState.workoutFinished) {
      this.resultsService.saveResult();
      this.workoutService.setWorkoutCompleted(
        this.workoutState.id,
        this.workoutState.isSuccess,
        this.workoutDuration
      );
    }
  }

}