import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Exercise } from '../../../shared/models/exercise.model';
import { ExerciseService } from '../../../shared/services/exercise.service';
import { WorkoutService } from '../../../shared/services/workout.service';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit {
  exercises: Array<Exercise> = [];
  exerciseSubscription: Subscription;
  id: string;
  editMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private exerciseService: ExerciseService,
    private workoutService: WorkoutService,
  ) { }

  ngOnInit() {
    this.exercises = this.exerciseService.getCurrentExercises();
    this.exerciseSubscription = this.exerciseService.exercisesChanged
      .subscribe((exercises) => this.exercises = exercises);
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }

}
