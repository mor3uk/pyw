import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

import { ExerciseRoundsInfo } from '../../../shared/models/exercise-rounds-info.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutActionService {
  roundsInfoChanged = new Subject<ExerciseRoundsInfo>();
  roundsReseted = new Subject();
}