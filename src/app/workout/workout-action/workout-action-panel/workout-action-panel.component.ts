import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Workout } from '../../../shared/models/workout.model';
import { Exercise } from '../../../shared/models/exercise.model';
import { Result } from '../../../shared/models/result.model';
import { ExerciseService } from '../../../shared/services/exercise.service';
import { WorkoutService } from '../../../shared/services/workout.service';
import { deepClone } from '../../../shared/utils/deep-clone';

@Component({
  selector: 'app-workout-action-panel',
  templateUrl: './workout-action-panel.component.html',
  styleUrls: ['./workout-action-panel.component.scss']
})
export class WorkoutActionPanelComponent implements OnInit {
  workout: Workout;
  exercises: Array<Exercise>;
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

  constructor(
    private exerciseService: ExerciseService,
    private workoutService: WorkoutService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.workout = this.workoutService.getWorkout(id);
    this.exercises = this.workoutService.getOwnExercises(id);
    this.setDefaultState();
  }

  onStartRound() {
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

  onRest() {
    this.currentResults.push(new Result(
      this.finishedRounds + 1, this.currentUnits, this.currentTime,
    ));
    this.roundJustFinished = false;
    this.currentTime = 0;
    this.currentTimer = setInterval(() => this.currentTime++, 1000);
    if (this.finishedRounds == this.currentExercise.roundAmount) {
      this.exerciseCompleted();
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
      ? this.currentExercise.unit + 's' : this.currentExercise.unit;
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
    }
  }

  setDefaultState() {
    this.currentExercise = this.exercises[0];
    this.currentExerciseIndex = 0;
    this.unitWord = this.currentExercise.unitAmount !== 1
      ? this.currentExercise.unit + 's' : this.currentExercise.unit;
    this.currentTime = 0;
    this.currentUnits = 0;
    this.finishedRounds = 0;
    this.finishedWorkoutRounds = 0;
    this.roundJustFinished = false;
    this.isRound = false;
    this.currentResults = [];
    this.workoutFinished = false;
    clearInterval(this.currentTimer);
    this.exercises.forEach((exercise) => exercise.resetResults());
  }

}
