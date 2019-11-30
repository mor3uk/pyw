import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Filters, sortBy } from '../shared/models/filters.model';
import { WorkoutService } from '../shared/services/workout.service';
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

    const filteredAndSotredWorkouts = filteredWorkouts.sort((b, a) => {
      switch (filters.sortBy) {
        case sortBy.DATE_CREATION:
          return a.createdAt - b.createdAt;
        case sortBy.DATE_COMPLETION:
          return a.completedAt - b.completedAt;
        case sortBy.DURATION:
          return a.duration - b.duration;
      }
      return 1;
    });

    return filteredAndSotredWorkouts;
  }
}