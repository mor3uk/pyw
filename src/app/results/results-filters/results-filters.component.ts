import { Component, OnInit } from '@angular/core';

import { FilterService } from '../filter.service';
import { Filters, sortBy } from 'src/app/shared/models/filters.model';

@Component({
  selector: 'app-results-filters',
  templateUrl: './results-filters.component.html',
  styleUrls: ['./results-filters.component.scss']
})
export class ResultsFiltersComponent implements OnInit {
  muscleGroup: string = '';
  status: string = '';
  sortBy: sortBy = 0;
  succeeded: string = '';

  constructor(private filterService: FilterService) { }

  ngOnInit() {
  }

  onUpdateFilters() {
    const filters: Filters = {
      sortBy: +this.sortBy,
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

    this.filterService.filtersChanged.next(filters);
  }

}
