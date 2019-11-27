import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';

import { ExerciseFormComponent } from './workout-create/exercise-form/exercise-form.component';
import { ExerciseItemComponent } from './workout-create/exercise-item/exercise-item.component';
import { WorkoutFormComponent } from './workout-create/workout-form/workout-form.component';
import { WorkoutInfoComponent } from './workout-create/workout-info/workout-info.component';
import { WorkoutActionComponent } from './workout-train/workout-action/workout-action.component';
import { WorkoutActionPanelComponent } from './workout-train/workout-action-panel/workout-action-panel.component';
import { WorkoutActionResultsComponent } from '../shared/components/workout-action-results/workout-action-results.component';
import { WorkoutComponent } from './workout.component';
import { PluralPipe } from '../shared/pipes/pluralize.pipe';
import { TimerPipe } from '../shared/pipes/timer.pipe';

@NgModule({
  declarations: [
    WorkoutComponent,
    ExerciseFormComponent,
    ExerciseItemComponent,
    WorkoutFormComponent,
    WorkoutInfoComponent,
    WorkoutActionComponent,
    WorkoutActionPanelComponent,
    WorkoutActionResultsComponent,
    PluralPipe,
    TimerPipe,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxTrimDirectiveModule,
  ],
  exports: [
    WorkoutActionResultsComponent,
    PluralPipe,
    TimerPipe,
  ],
  providers: [],
})
export class WorkoutModule { }