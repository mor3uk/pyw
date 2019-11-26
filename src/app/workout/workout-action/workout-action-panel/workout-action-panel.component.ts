import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Workout } from '../../../shared/models/workout.model';
import { Exercise } from '../../../shared/models/exercise.model';
import { Result } from '../../../shared/models/result.model';
import { ExerciseService } from '../../../shared/services/exercise.service';
import { WorkoutService } from '../../../shared/services/workout.service';
import { deepClone } from '../../../shared/utils/deep-clone';
import { WorkoutActionService } from '../workout-action.service';

@Component({
  selector: 'app-workout-action-panel',
  templateUrl: './workout-action-panel.component.html',
  styleUrls: ['./workout-action-panel.component.scss']
})
export class WorkoutActionPanelComponent implements OnInit {
  workout: Workout;
  exercises: Array<Exercise> = [];
  currentExercise: Exercise;
  currentExerciseIndex: number;
  unitWord: string;
  currentTimer;
  currentTime: number;
  currentUnits: number;
  finishedRounds: number;
  finishedWorkoutRounds: number;
  roundJustFinished: boolean;
  isRound: boolean;
  currentResults: Array<Result>;
  workoutFinished: boolean;
  isSuccess: boolean;
  workoutTime: number;
  workoutTimer;

  constructor(
    private exerciseService: ExerciseService,
    private workoutService: WorkoutService,
    private route: ActivatedRoute,
    private workoutActionService: WorkoutActionService,
    private router: Router,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.workout = this.workoutService.getWorkout(id);
    this.exercises = this.workoutService.getOwnExercises(id);
    this.setDefaultState();
  }

  onStartRound() {
    if (!(this.currentExerciseIndex || this.finishedWorkoutRounds)) {
      this.workoutTimer = setInterval(() => this.workoutTime++, 1000);
    }
    if (!this.workoutFinished) {
      clearInterval(this.currentTimer);
      this.currentTime = 0;
      this.currentTimer = setInterval(() => this.currentTime++, 1000);
      this.isRound = true;
    }
  }

  onFinishRound() {
    clearInterval(this.currentTimer);
    this.roundJustFinished = true;
    this.isRound = false;
    this.finishedRounds++;
  }

  enableRest() {
    return !isNaN(this.currentUnits) 
      && this.currentUnits > 0 
      && this.currentUnits < 200;
  }

  onRest() {
    if (this.enableRest()) {
      if (this.currentExercise.unitAmount > this.currentUnits) {
        this.isSuccess = false;
      }
      this.currentResults.push(new Result(
        this.finishedRounds + 1,
        this.currentUnits,
        this.currentTime,
      ));
      this.workoutActionService.roundsInfoChanged.next({
        exerciseName: this.currentExercise.name,
        workoutRound: this.finishedWorkoutRounds + 1,
        exerciseRound: this.finishedRounds,
        exerciseUnits: this.currentExercise.unitAmount,
        actualUnits: this.currentUnits,
        exerciseTime: this.currentTime,
        exerciseUnit: this.currentExercise.unit,
      });

      this.roundJustFinished = false;
      this.currentTime = 0;
      this.currentUnits = 1;
      this.currentTimer = setInterval(() => this.currentTime++, 1000);
      if (this.finishedRounds == this.currentExercise.roundAmount) {
        this.exerciseCompleted();
      }
    }

  }

  exerciseCompleted() {
    this.exercises[this.currentExerciseIndex].result
      .results[this.finishedWorkoutRounds] = this.currentResults.slice();
    this.currentResults = [];

    if (this.currentExerciseIndex === this.exercises.length - 1) {
      this.currentExerciseIndex = 0;
      this.finishedWorkoutRounds++;

      if (this.finishedWorkoutRounds === this.workout.rounds) {
        this.workoutFinished = true;
        clearInterval(this.currentTimer);
        return;
      }
    } else {
      this.currentExerciseIndex++;
    }

    this.finishedRounds = 0;
    this.currentExercise = this.exercises[this.currentExerciseIndex];
    this.unitWord = this.currentExercise.unitAmount !== 1
      ? this.currentExercise.unit + 's'
      : this.currentExercise.unit;
  }

  secondsToTimer() {
    const date = new Date(null);
    date.setSeconds(this.currentTime);
    return date.toISOString().substr(14, 5);
  }

  readyToStart() {
    return !(this.roundJustFinished || this.workoutFinished);
  }

  onSaveExercisesResults() {
    if (this.workoutFinished) {
      this.exerciseService.rewriteExercises(deepClone(this.exercises));
      this.workoutService.setWorkoutCompleted(
        this.workout.id, this.isSuccess, this.workoutTime);

      this.router.navigate(['results']);
    }
  }

  setDefaultState() {
    this.currentExercise = this.exercises[0];
    this.currentExerciseIndex = 0;
    this.unitWord = this.currentExercise.unitAmount !== 1
      ? this.currentExercise.unit + 's' : this.currentExercise.unit;
    this.currentTime = 0;
    this.currentUnits = 1;
    this.finishedRounds = 0;
    this.finishedWorkoutRounds = 0;
    this.workoutTime = 0;
    this.roundJustFinished = false;
    this.isRound = false;
    this.currentResults = [];
    this.workoutFinished = false;
    this.isSuccess = true;
    clearInterval(this.currentTimer);
    clearInterval(this.workoutTimer);
    this.exercises.forEach((exercise) => exercise.result.results = []);
    this.workoutActionService.roundsReseted.next();
  }

}