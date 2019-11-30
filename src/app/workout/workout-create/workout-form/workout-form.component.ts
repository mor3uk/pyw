import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { WorkoutService } from '../../../shared/services/workout.service';
import { ExerciseService } from '../../../shared/services/exercise.service';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss']
})
export class WorkoutFormComponent implements OnInit, OnDestroy {
  @Output() workoutAdded = new EventEmitter();
  @Input() exercisesNumber: number;
  editMode: boolean = false;
  editModeSubscription: Subscription;
  muscleGroup: string = '';
  roundsNumber: number;

  constructor(
    private workoutService: WorkoutService,
    private exerciseService: ExerciseService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.editModeSubscription = this.exerciseService.exerciseEditModeChanged
      .subscribe((editMode) => this.editMode = editMode);
  }

  isDisabled() {
    return this.roundsNumber == null
      || this.roundsNumber < 1
      || !this.exercisesNumber
      || this.muscleGroup.length > 25
      || this.editMode;
  }

  onSaveWorkout() {
    if (!this.isDisabled()) {
      this.workoutService.addWorkout(this.muscleGroup, this.roundsNumber);
      this.workoutAdded.emit();

      const lastWorkout = this.workoutService.getLastWorkout();
      this.router.navigate(['/workout', 'train', lastWorkout.id]);
    }
  }

  ngOnDestroy() {
    this.editModeSubscription.unsubscribe();
  }

}
