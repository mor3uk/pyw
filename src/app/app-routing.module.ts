import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckIdGuard } from './shared/guards/check-id-guard.service';
import { WorkoutComponent } from './workout/workout.component';
import { WorkoutInfoComponent } from './workout/workout-create/workout-info/workout-info.component';
import { WorkoutActionComponent } from './workout/workout-train/workout-action/workout-action.component';
import { ResultsComponent } from './results/results.component';
import { ExerciseFormComponent } from './workout/workout-create/exercise-form/exercise-form.component';
import { ResultsInfoComponent } from './results/results-info/results-info.component';
import { CanDeactivateGuard } from './shared/guards/can-deactivate-guard.service';

const routes: Routes = [
  {
    path: 'workout', component: WorkoutComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'exercises' },
      {
        path: 'exercises', 
        component: WorkoutInfoComponent, 
        canDeactivate: [CanDeactivateGuard], 
        children: [
          { path: '', component: ExerciseFormComponent },
          {
            path: ':id',
            canActivate: [CheckIdGuard],
            canDeactivate: [CanDeactivateGuard],
            component: ExerciseFormComponent,
          },
        ]
      },
      {
        path: 'train/:id',
        canActivate: [CheckIdGuard],
        canDeactivate: [CanDeactivateGuard],
        component: WorkoutActionComponent,
      },
    ]
  },
  {
    path: 'results', component: ResultsComponent, children: [
      { path: '', component: ResultsInfoComponent },
      { path: ':id', canActivate: [CheckIdGuard], component: ResultsInfoComponent },
    ]
  },
  { path: '**', redirectTo: 'workout/exercises' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
