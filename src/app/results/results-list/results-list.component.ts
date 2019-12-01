import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { FilterService } from '../filter.service';
import { WorkoutService } from '../../shared/services/workout.service';
import { Workout } from '../../shared/models/workout.model';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss']
})
export class ResultsListComponent implements OnInit, OnDestroy {
  workouts: Workout[] = [];
  filtersChangedSubscription: Subscription;
  workoutsChangedSubscription: Subscription;

  constructor(
    private filterService: FilterService,
    private workoutService: WorkoutService,
  ) { }

  ngOnInit() {
    this.workouts = this.workoutService.getWorkouts();
    this.filtersChangedSubscription = this.filterService
      .filtersChanged.subscribe((filters) =>
        this.workouts = this.filterService.getFilteredWorkouts(filters));

    this.workoutsChangedSubscription = this.workoutService
      .workoutsChanged.subscribe(() =>
        this.workouts = this.workoutService.getWorkouts());
  }

  ngOnDestroy() {
    this.filtersChangedSubscription.unsubscribe();
    this.workoutsChangedSubscription.unsubscribe();
  }

}
