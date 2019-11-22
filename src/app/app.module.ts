import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkoutComponent } from './workout/workout.component';
import { HeaderComponent } from './header/header.component';
import { ExerciseListComponent } from './workout/workout-exercises/exercise-list/exercise-list.component';
import { ExerciseItemComponent } from './workout/workout-exercises/exercise-list/exercise-item/exercise-item.component';
import { ExerciseEditComponent } from './workout/workout-exercises/exercise-edit/exercise-edit.component';
import { WorkoutActionComponent } from './workout/workout-action/workout-action.component';
import { WorkoutExercisesComponent } from './workout/workout-exercises/workout-exercises.component';
import { WorkoutInfoComponent } from './workout/workout-exercises/workout-info/workout-info.component';
import { ResultsComponent } from './results/results.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkoutComponent,
    HeaderComponent,
    ExerciseListComponent,
    ExerciseItemComponent,
    ExerciseEditComponent,
    WorkoutActionComponent,
    WorkoutExercisesComponent,
    WorkoutInfoComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
