import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';

import { PluralPipe } from '../shared/pipes/pluralize.pipe';
import { TimerPipe } from '../shared/pipes/timer.pipe';
import { ExerciseFormComponent } from './workout-create/exercise-form/exercise-form.component';
import { ExerciseItemComponent } from './workout-create/exercise-item/exercise-item.component';
import { WorkoutFormComponent } from './workout-create/workout-form/workout-form.component';
import { WorkoutInfoComponent } from './workout-create/workout-info/workout-info.component';
import { WorkoutActionComponent } from './workout-train/workout-action/workout-action.component';
import { WorkoutPanelComponent } from './workout-train/workout-panel/workout-panel.component';
import { WorkoutComponent } from './workout.component';
import { WorkoutResultsComponent } from '../shared/components/workout-results/workout-results.component';

@NgModule({
  declarations: [
    WorkoutComponent,
    ExerciseFormComponent,
    ExerciseItemComponent,
    WorkoutFormComponent,
    WorkoutInfoComponent,
    WorkoutActionComponent,
    WorkoutPanelComponent,
    WorkoutResultsComponent,
    PluralPipe,
    TimerPipe,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxTrimDirectiveModule,
    HttpClientModule,
  ],
  exports: [
    WorkoutResultsComponent,
    PluralPipe,
    TimerPipe,
  ],
  providers: [],
})
export class WorkoutModule { }