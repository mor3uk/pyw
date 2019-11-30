import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { WorkoutService } from '../shared/services/workout.service';
import { Filters, sortBy } from './filters.model';
import { Workout } from '../shared/models/workout.model';

@Injectable()
export class FilterService {
  filtersChanged = new Subject<Filters>();

  constructor(private workoutService: WorkoutService) { }

  getFilteredWorkouts(filters: Filters): Workout[] {
    const workouts = this.workoutService.getWorkouts();
    
    const filteredWorkouts = workouts.filter((workout) => {
      let muscleGroupMatch = true;
      let statusMatch = true;
      let succeededMatch = true;

      if (filters.muscleGroup) {
        muscleGroupMatch = workout.muscleGroup.toLowerCase()
          .includes(filters.muscleGroup.toLowerCase());
      }
      if (filters.status !== null) {
        statusMatch = workout.status.completed === filters.status;
      }
      if (filters.succeeded !== null) {
        succeededMatch = workout.status.succeeded === filters.succeeded
          && workout.status.completed;
      }

      return muscleGroupMatch && statusMatch && succeededMatch;
    });

    const filteredAndSotredWorkouts = filteredWorkouts.sort((a, b) => {
      if (filters.sortReverse) {
        const temp = a;
        a = b;
        b = temp;
      }
      switch (filters.sortBy) {
        case sortBy.DATE_CREATION:
          return a.createdAt - b.createdAt;
        case sortBy.DATE_COMPLETION:
          return a.completedAt - b.completedAt;
        case sortBy.DURATION:
          return b.duration - a.duration;
      }
      return 1;
    });

    return filteredAndSotredWorkouts;
  }
}