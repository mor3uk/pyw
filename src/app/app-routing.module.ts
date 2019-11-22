import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkoutComponent } from './workout/workout.component';
import { WorkoutExercisesComponent } from './workout/workout-exercises/workout-exercises.component';
import { WorkoutActionComponent } from './workout/workout-action/workout-action.component';
import { ResultsComponent } from './results/results.component';


const routes: Routes = [
  {
    path: 'workout', component: WorkoutComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'new' },
      { path: 'new', component: WorkoutExercisesComponent },
      { path: 'edit/:id', component: WorkoutExercisesComponent },
      { path: 'train/:id', component: WorkoutActionComponent },
    ]
  },
  { path: 'results', component: ResultsComponent },
  { path: '**', redirectTo: 'workout/new' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
