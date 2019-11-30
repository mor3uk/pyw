import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ExerciseService } from '../../../shared/services/exercise.service';
import { Exercise } from '../../../shared/models/exercise.model';

@Component({
  selector: 'app-workout-info',
  templateUrl: './workout-info.component.html',
  styleUrls: ['./workout-info.component.scss']
})
export class WorkoutInfoComponent implements OnInit, OnDestroy {
  exercises: Exercise[] = [];
  exerciseSubscription: Subscription;

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.exercises = this.exerciseService.getCurrentExercises();
    this.exerciseSubscription = this.exerciseService.exercisesChanged
      .subscribe(() => this.exercises = this.exerciseService.getCurrentExercises());
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }

}
