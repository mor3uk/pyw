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
import { WorkoutPanelComponent } from './workout-train/workout-panel/workout-panel.component';
import { WorkoutComponent } from './workout.component';
import { WorkoutResultsModule } from '../shared/modules/workout-results.module';

@NgModule({
  declarations: [
    WorkoutComponent,
    ExerciseFormComponent,
    ExerciseItemComponent,
    WorkoutFormComponent,
    WorkoutInfoComponent,
    WorkoutActionComponent,
    WorkoutPanelComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxTrimDirectiveModule,
    WorkoutResultsModule
  ],
  exports: [],
  providers: [],
})
export class WorkoutModule { }