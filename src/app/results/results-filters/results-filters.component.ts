import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { FilterService } from '../filter.service';
import { WorkoutService } from '../../shared/services/workout.service';
import { Filters, sortBy } from '../../results/filters.model';

@Component({
  selector: 'app-results-filters',
  templateUrl: './results-filters.component.html',
  styleUrls: ['./results-filters.component.scss']
})
export class ResultsFiltersComponent implements OnInit, OnDestroy {
  muscleGroup: string = '';
  status: string = '';
  sortBy: sortBy = 0;
  succeeded: string = '';
  sortReverse: boolean = false;
  listLength: number;
  workoutWasRemovedSubscription: Subscription;

  constructor(
    private filterService: FilterService,
    private workoutService: WorkoutService,
  ) { }

  ngOnInit() {
    this.listLength = this.workoutService.getWorkouts().length;
    
    this.workoutWasRemovedSubscription = this.workoutService
      .workoutsChanged.subscribe(() => {
        this.listLength = this.workoutService.getWorkouts().length;
      });
  }

  onUpdateFilters() {
    if (!(this.succeeded || this.status)) {
      this.sortBy = 0;
    }

    const filters: Filters = {
      sortBy: +this.sortBy,
      muscleGroup: this.muscleGroup.trim(),
      succeeded: null,
      status: null,
      sortReverse: this.sortReverse,
    };

    if (this.succeeded) {
      filters.succeeded = this.succeeded === 'succeeded';
    }

    if (this.status) {
      filters.status = this.status === 'completed';
    }

    this.filterService.filtersChanged.next(filters);
  }

  ngOnDestroy() {
    this.workoutWasRemovedSubscription.unsubscribe();
  }

}
