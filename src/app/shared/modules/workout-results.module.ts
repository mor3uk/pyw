import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkoutResultsComponent } from '../components/workout-results/workout-results.component';
import { PluralPipe } from '../pipes/pluralize.pipe';
import { TimerPipe } from '../pipes/timer.pipe';

@NgModule({
  declarations: [
    WorkoutResultsComponent,
    PluralPipe,
    TimerPipe,
  ],
  imports: [CommonModule],
  exports: [
    WorkoutResultsComponent,
    PluralPipe,
    TimerPipe,
  ],
  providers: [],
})
export class WorkoutResultsModule { }