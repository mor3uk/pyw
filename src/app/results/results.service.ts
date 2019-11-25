import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

import { Workout } from '../shared/models/workout.model';

@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  workoutResultPicked = new Subject<Workout>();
}