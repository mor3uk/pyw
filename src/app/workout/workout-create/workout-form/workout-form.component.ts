import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { WorkoutService } from 'src/app/shared/services/workout.service';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss']
})
export class WorkoutFormComponent implements OnInit {
  @Input() exercisesNumber: number;
  muscleGroup: string;
  rounds: number;

  constructor(
    private workoutService: WorkoutService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  isDisabled() {
    return this.rounds == null || this.rounds < 1 || !this.exercisesNumber;
  }

  onSaveWorkout() {
    if (!this.isDisabled()) {
      this.workoutService.addWorkout(this.muscleGroup, this.rounds);

      const lastWorkout = this.workoutService.getLastWorkout();
      this.router.navigate(['/workout', 'train', lastWorkout.id]);
    }
  }

}
