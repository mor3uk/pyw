import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import moment from 'moment';

import { Exercise } from '../../../shared/models/exercise.model';
import { ExerciseService } from '../../../shared/services/exercise.service';
import { Workout } from '../../../shared/models/workout.model';
import { WorkoutService } from '../../../shared/services/workout.service';

@Component({
  selector: 'app-workout-info',
  templateUrl: './workout-info.component.html',
  styleUrls: ['./workout-info.component.scss']
})
export class WorkoutInfoComponent implements OnInit, OnDestroy {
  exercises: Array<Exercise> = [];
  muscleGroup: string;
  rounds: number;
  exerciseSubscription: Subscription;
  editMode: boolean = false;

  constructor(
    private exerciseService: ExerciseService,
    private workoutService: WorkoutService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.exercises = this.exerciseService.getCurrentExercises();
    this.exerciseSubscription = this.exerciseService.exercisesChanged
      .subscribe((exercises) => this.exercises = exercises);

    this.route.params.subscribe((params) =>
      params.id ? this.editMode = true : this.editMode = false
    );
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }

  private isDisabled() {
    return this.exercises.length === 0 || this.editMode
      || !this.rounds;
  }

  onSaveWorkout() {
    if (!this.isDisabled()) {
      const ids = this.exercises.map((exercise) => exercise.id);
      const workout = new Workout(this.muscleGroup, this.rounds, ids);
      this.workoutService.addWorkout(workout);

      const lastWorkout = this.workoutService.getLastWorkout();
      this.router.navigate(['..', 'train', lastWorkout.id], { relativeTo: this.route });
    }
  }

}
