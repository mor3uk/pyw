import { Component, OnInit } from '@angular/core';

import { WorkoutService } from '../../shared/services/workout.service';

@Component({
  selector: 'app-results-filters',
  templateUrl: './results-filters.component.html',
  styleUrls: ['./results-filters.component.scss']
})
export class ResultsFiltersComponent implements OnInit {
  muscleGroup: string = '';
  status: string = '';
  sortBy: 'date-creation' | 'date-completion' | 'time-completion' = 'date-creation';
  succeeded: string = '';

  constructor(private workoutService: WorkoutService) {

  }

  ngOnInit() {
  }

  onUpdateFilters() {
    const filters = {
      sortBy: this.sortBy,
      muscleGroup: this.muscleGroup.trim(),
      succeeded: null,
      status: null,
    };

    if (this.succeeded) {
      filters.succeeded = this.succeeded === 'succeeded';
    }

    if (this.status) {
      filters.status = this.status === 'completed';
    }

    this.workoutService.workoutFiltersChanged.next(filters);
  }

}
