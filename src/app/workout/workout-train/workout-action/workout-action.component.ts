import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { WorkoutStateService } from '../workout-state.service';
import { ResultsService } from '../../../shared/services/results.service';
import { CanDeactivateComponent } from '../../../shared/guards/can-deactivate-guard.service';

@Component({
  selector: 'app-workout-action',
  templateUrl: './workout-action.component.html',
  styleUrls: ['./workout-action.component.scss'],
  providers: [WorkoutStateService],
})
export class WorkoutActionComponent implements OnInit, OnDestroy, CanDeactivateComponent {
  exerciseRoundsGroups: any[] = [];
  exerciseRoundAddedSubscription: Subscription;
  exerciseRoundResetedSubscription: Subscription;
  workoutSaved: boolean = false;

  constructor(private resultsService: ResultsService) { }

  ngOnInit() {
    this.exerciseRoundAddedSubscription = this.resultsService
      .exerciseRoundAdded.subscribe((exerciseRoundsGroups) =>
        this.exerciseRoundsGroups = exerciseRoundsGroups);

    this.exerciseRoundResetedSubscription = this.resultsService
      .exerciseRoundReseted.subscribe(() => this.exerciseRoundsGroups = []);

  }

  ngOnDestroy() {
    this.exerciseRoundAddedSubscription.unsubscribe();
    this.exerciseRoundResetedSubscription.unsubscribe();
  }

  canDeactivate() {
    if (!this.workoutSaved) {
      return confirm('Do you really want to discard the current results?');
    }

    return true;
  }
}
