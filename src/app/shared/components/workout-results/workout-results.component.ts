import { Component, OnInit, Input } from '@angular/core';

import { ExerciseService } from '../../services/exercise.service';

@Component({
  selector: 'app-workout-results',
  templateUrl: './workout-results.component.html',
  styleUrls: ['./workout-results.component.scss']
})
export class WorkoutResultsComponent implements OnInit {
  @Input() exerciseRoundsGroup: any[] = [];
  exerciseName: string;
  workoutRound: number;
  unitNumber: number;
  unitType: string;

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
    const id = this.exerciseRoundsGroup[0].exerciseId;
    const exercise = this.exerciseService.getExerciseById(id);
    this.exerciseName = exercise.name;
    this.unitNumber = exercise.unitNumber;
    this.unitType = exercise.unitType;
    this.workoutRound = this.exerciseRoundsGroup[0].workoutRound;
  }

}
