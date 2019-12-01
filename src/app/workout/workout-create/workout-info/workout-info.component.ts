import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ExerciseService } from '../../../shared/services/exercise.service';
import { CanDeactivateComponent } from '../../../shared/guards/can-deactivate-guard.service';
import { Exercise } from '../../../shared/models/exercise.model';

@Component({
  selector: 'app-workout-info',
  templateUrl: './workout-info.component.html',
  styleUrls: ['./workout-info.component.scss']
})
export class WorkoutInfoComponent implements OnInit, OnDestroy, CanDeactivateComponent {
  exercises: Exercise[] = [];
  exerciseSubscription: Subscription;
  workoutAdded: boolean = false;

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.exercises = this.exerciseService.getCurrentExercises();
    this.exerciseSubscription = this.exerciseService.exercisesChanged
      .subscribe(() => this.exercises = this.exerciseService.getCurrentExercises());
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }

  canDeactivate() {
    if (!this.workoutAdded && this.exercises.length !== 0) {
      return confirm('Your workout will not be saved, do you want to leave?');
    }

    return true;
  }

}
