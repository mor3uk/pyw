import { Component, OnInit } from '@angular/core';
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
export class WorkoutInfoComponent implements OnInit {
  exercises: Array<Exercise> = [];
  muscleGroup: string;
  rounds: number;

  constructor(
    private exerciseService: ExerciseService,
    private workoutService: WorkoutService,
  ) { }

  ngOnInit() {
    this.exerciseService.exercisesChanged
      .subscribe((exercises) => this.exercises = exercises);
  }

  onSaveWorkout() {
    const ids = this.exercises.map((exercise) => exercise.id);
    const workout = new Workout(
      +moment(), this.muscleGroup, this.rounds, ids
    );
    this.workoutService.addWorkout(workout);
  }

}
