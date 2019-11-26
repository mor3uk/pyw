import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkoutComponent } from './workout/workout.component';
import { WorkoutInfoComponent } from './workout/workout-info/workout-info.component';
import { WorkoutActionComponent } from './workout/workout-action/workout-action.component';
import { ResultsComponent } from './results/results.component';
import { ExerciseEditComponent } from './workout/exercise-edit/exercise-edit.component';
import { ResultsInfoComponent } from './results-info/results-info.component';

const routes: Routes = [
  {
    path: 'workout', component: WorkoutComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'exercises' },
      {
        path: 'exercises', component: WorkoutInfoComponent, children: [
          { path: '', component: ExerciseEditComponent },
          { path: ':id', component: ExerciseEditComponent },
        ]
      },
      { path: 'train/:id', component: WorkoutActionComponent },
    ]
  },
  { path: 'results', component: ResultsComponent, children: [
    { path: '', component: ResultsInfoComponent },
    { path: ':id', component: ResultsInfoComponent },
  ] },
  { path: '**', redirectTo: 'workout/exercises' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
