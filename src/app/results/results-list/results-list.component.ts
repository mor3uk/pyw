import { Component, OnInit } from '@angular/core';

import { Workout } from '../../shared/models/workout.model';
import { FilterService } from '../filter.service';
import { WorkoutService } from 'src/app/shared/services/workout.service';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss']
})
export class ResultsListComponent implements OnInit {
  workouts: Workout[] = [];

  constructor(
    private filterService: FilterService,
    private workoutService: WorkoutService,
  ) { }

  ngOnInit() {
    this.workouts = this.workoutService.getWorkouts();
    this.filterService.filtersChanged
      .subscribe((filters) => {
        this.workouts = this.filterService.getFilteredWorkouts(filters);
      });
    this.workoutService.workoutWasRemoved
      .subscribe(() => this.workouts = this.workoutService.getWorkouts());
  }

}
