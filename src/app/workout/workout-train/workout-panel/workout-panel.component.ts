import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Workout } from '../../../shared/models/workout.model';
import { WorkoutService } from '../../../shared/services/workout.service';
import { WorkoutState } from '../workout-state.model';
import { WorkoutStateService } from '../workout-state.service';

@Component({
  selector: 'app-workout-panel',
  templateUrl: './workout-panel.component.html',
  styleUrls: ['./workout-panel.component.scss']
})
export class WorkoutPanelComponent implements OnInit {
  workout: Workout;
  workoutState: WorkoutState;
  isRound: boolean = false;
  roundJustFinished: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private workoutService: WorkoutService,
    private workoutStateService: WorkoutStateService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    const exercises = this.workoutService.getOwnExercises(id);
    this.workout = this.workoutService.getWorkout(id);

    this.workoutState = {
      id,
      exercises,
      currentExercise: exercises[0],
      workoutTimerValue: 0,
      currentUnitNumber: 1,
      exerciseFinishedRounds: 0,
      workoutFinishedRounds: 0,
      isSuccess: true,
      workoutFinished: false,
    };
    this.workoutStateService.setDefaultWorkoutState(this.workoutState);

    this.workoutStateService.workoutStateReseted
      .subscribe((workoutState) => {
        this.workoutState = workoutState;
        this.roundJustFinished = false;
      });
  }

  onStartRound() {
    if (this.roundJustFinished || this.workoutState.workoutFinished) {
      return;
    }
    this.isRound = true;
    this.workoutStateService.runTimer();
  }

  onFinishRound() {
    this.workoutState.exerciseFinishedRounds++;
    this.isRound = false;
    this.roundJustFinished = true;
    this.workoutStateService.pauseTimer();
  }

  enableRest() {
    const unitNum: number = this.workoutState.currentUnitNumber;
    return !isNaN(unitNum) && unitNum > 0 && unitNum < 200;
  }

  onRest() {
    this.roundJustFinished = false;
    this.workoutStateService.rest();
  }

  onSaveResult() {
    this.workoutStateService.save();
  }

  onTryAgain() {
    this.workoutStateService.resetWorkoutState();
  }

}