import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExerciseService } from '../shared/services/exercise.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent implements OnInit, OnDestroy {

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.exerciseService.emptyCurrentExercises();
  }

}
