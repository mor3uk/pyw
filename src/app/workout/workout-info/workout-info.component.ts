import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Exercise } from '../../shared/models/exercise.model';
import { ExerciseService } from '../../shared/services/exercise.service';

@Component({
  selector: 'app-workout-info',
  templateUrl: './workout-info.component.html',
  styleUrls: ['./workout-info.component.scss']
})
export class WorkoutInfoComponent implements OnInit, OnDestroy {
  exercises: Array<Exercise> = [];
  exerciseSubscription: Subscription;

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.exercises = this.exerciseService.getCurrentExercises();
    this.exerciseSubscription = this.exerciseService.exercisesChanged
      .subscribe((exercises) => this.exercises = exercises);
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }

}
