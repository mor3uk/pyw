import { Component, OnInit } from '@angular/core';

import { WorkoutService } from '../../shared/services/workout.service';
import { Workout } from '../../shared/models/workout.model';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss']
})
export class ResultsListComponent implements OnInit {
  workouts: Array<Workout> = [];

  constructor(private workoutService: WorkoutService) { }

  ngOnInit() {
    this.workouts = this.workoutService.getWorkouts();
    this.workoutService.workoutFiltersChanged
      .subscribe((filters) => {
        this.workouts = this.workoutService.getFilteredWorkouts(filters);
      });
    this.workoutService.workoutWasRemoved
      .subscribe(() => this.workouts = this.workoutService.getWorkouts());
  }

}
