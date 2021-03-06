import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { WorkoutService } from '../../../shared/services/workout.service';
import { WorkoutStateService } from '../workout-state.service';
import { Workout } from '../../../shared/models/workout.model';
import { WorkoutState } from '../workout-state.model';

@Component({
  selector: 'app-workout-panel',
  templateUrl: './workout-panel.component.html',
  styleUrls: ['./workout-panel.component.scss']
})
export class WorkoutPanelComponent implements OnInit {
  @Output() workoutSaved = new EventEmitter();
  workout: Workout;
  workoutState: WorkoutState;
  isRound: boolean = false;
  roundJustFinished: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private workoutService: WorkoutService,
    private workoutStateService: WorkoutStateService,
    private router: Router,
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
    this.workoutStateService.startRound();
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
    this.workoutSaved.emit();
    this.router.navigate(['results']);
  }

  onTryAgain() {
    this.workoutStateService.resetWorkoutState();
  }

}