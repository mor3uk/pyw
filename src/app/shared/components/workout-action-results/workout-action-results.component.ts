import { Component, OnInit, Input } from '@angular/core';

import { ExerciseRoundsInfo } from '../../models/exercise-rounds-info.model';

@Component({
  selector: 'app-workout-action-results',
  templateUrl: './workout-action-results.component.html',
  styleUrls: ['./workout-action-results.component.scss']
})
export class WorkoutActionResultsComponent implements OnInit {
  @Input() exerciseRoundsInfo: Array<ExerciseRoundsInfo> = [];
  exerciseName: string;
  workoutRound: number;
  exerciseUnits: number;
  unit: string;

  constructor() {
  }

  ngOnInit() {
    this.exerciseName = this.exerciseRoundsInfo[0].exerciseName;
    this.workoutRound = this.exerciseRoundsInfo[0].workoutRound;
    this.exerciseUnits = this.exerciseRoundsInfo[0].exerciseUnits;
    this.unit = this.exerciseRoundsInfo[0].exerciseUnit;
  }

}
