import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { WorkoutState } from './workout-state.model';
import { ResultsService } from 'src/app/shared/services/results.service';
import { WorkoutService } from 'src/app/shared/services/workout.service';

@Injectable()
export class WorkoutStateService {
  workoutStateReseted = new Subject<WorkoutState>();
  workoutState: WorkoutState;
  workoutTimer;
  defaultWorkoutState: WorkoutState;
  currentExI: number = 0;

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
    this.resultsService.initializeResult(workoutState.id);
  }

  resetWorkoutState() {
    this.workoutState = { ...this.defaultWorkoutState };
    this.currentExI = 0;
    this.workoutStateReseted.next(this.workoutState);
    this.resultsService.initializeResult(this.workoutState.id);
    clearInterval(this.workoutTimer);
  }

  pauseTimer() {
    clearInterval(this.workoutTimer);
  }

  runTimer() {
    clearInterval(this.workoutTimer);
    this.workoutState.workoutTimerValue = 0;
    this.workoutTimer = setInterval(() =>
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

  save() {
    if (this.workoutState.workoutFinished) {
      this.resultsService.saveResult();
      this.workoutService.setWorkoutCompleted(
        this.workoutState.id,
        this.workoutState.isSuccess
      );
    }
  }

}