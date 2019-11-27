import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { WorkoutActionService } from './workout-action.service';
import { ExerciseRoundsInfo } from '../../../shared/models/exercise-rounds-info.model';

@Component({
  selector: 'app-workout-action',
  templateUrl: './workout-action.component.html',
  styleUrls: ['./workout-action.component.scss']
})
export class WorkoutActionComponent implements OnInit, OnDestroy {
  workoutRoundsInfo: Array<ExerciseRoundsInfo>[] = [];
  roundsUpdatedSubscription: Subscription;
  roundsResetedSubscription: Subscription;
  rounds: Subscription;
  resultI: number;

  constructor(private workoutActionService: WorkoutActionService) { }

  ngOnInit() {
    this.roundsUpdatedSubscription = this.workoutActionService
      .roundsInfoChanged.subscribe((roundInfo) => {
        if (roundInfo.exerciseRound === 1) {
          this.resultI++;
        }
        if (!this.workoutRoundsInfo[this.resultI]) {
          this.workoutRoundsInfo[this.resultI] = [];
        }
        this.workoutRoundsInfo[this.resultI]
          .push(roundInfo);
      });

    this.roundsResetedSubscription = this.workoutActionService
      .roundsReseted.subscribe(() => {
        this.workoutRoundsInfo = [];
        this.resultI = -1;
      });
  } 

  ngOnDestroy() {
    this.roundsUpdatedSubscription.unsubscribe();
    this.roundsResetedSubscription.unsubscribe();
  }

}
