import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

import { WorkoutService } from '../services/workout.service';
import { ExerciseService } from '../services/exercise.service';

@Injectable({
  providedIn: 'root',
})
export class CheckIdGuard implements CanActivate {
  constructor(
    private workoutService: WorkoutService,
    private exerciseService: ExerciseService,
    private router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const id = route.params.id;

    switch ((<Function>route.component).name) {
      case 'ExerciseFormComponent':
        const currentExercise = this.exerciseService.getCurrentExerciseById(id);
        if (currentExercise) {
          return true;
        }
        this.router.navigate(['workout', 'exercises']);
        return false;
      case 'ResultsInfoComponent':
      case 'WorkoutActionComponent':
        const workout = this.workoutService.getWorkout(id);
        if (workout) {
          return true;
        }
        this.router.navigate(['results']);
        return false;
    }

    return true;
  }
}
