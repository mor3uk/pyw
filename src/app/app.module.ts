import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkoutComponent } from './workout/workout.component';
import { HeaderComponent } from './header/header.component';
import { ExerciseItemComponent } from './workout/workout-info/exercise-item/exercise-item.component';
import { ExerciseEditComponent } from './workout/exercise-edit/exercise-edit.component';
import { WorkoutActionComponent } from './workout/workout-action/workout-action.component';
import { WorkoutInfoComponent } from './workout/workout-info/workout-info.component';
import { ResultsComponent } from './results/results.component';
import { WorkoutActionPanelComponent } from './workout/workout-action/workout-action-panel/workout-action-panel.component';
import { WorkoutActionResultsComponent } from './workout/workout-action/workout-action-results/workout-action-results.component';
import { ResultsListComponent } from './results/results-list/results-list.component';
import { ResultsFiltersComponent } from './results/results-filters/results-filters.component';
import { ResultsItemComponent } from './results/results-item/results-item.component';
import { ResultsInfoComponent } from './results-info/results-info.component';
import { WorkoutFormComponent } from './workout/workout-info/workout-form/workout-form.component';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { PluralPipe } from './shared/pipes/pluralize.pipe';
import { TimerPipe } from './shared/pipes/timer.pipe';
import { DatediffPipe } from './shared/pipes/datediff.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WorkoutComponent,
    HeaderComponent,
    ExerciseItemComponent,
    ExerciseEditComponent,
    WorkoutActionComponent,
    WorkoutInfoComponent,
    WorkoutInfoComponent,
    ResultsComponent,
    WorkoutActionPanelComponent,
    WorkoutActionResultsComponent,
    ResultsListComponent,
    ResultsFiltersComponent,
    ResultsItemComponent,
    ResultsInfoComponent,
    WorkoutFormComponent,
    PluralPipe,
    TimerPipe,
    DatediffPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxTrimDirectiveModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
