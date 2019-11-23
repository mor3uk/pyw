import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Workout } from '../../../shared/models/workout.model';
import { Exercise } from '../../../shared/models/exercise.model';
import { WorkoutService } from '../../../shared/services/workout.service';

@Component({
  selector: 'app-workout-action-panel',
  templateUrl: './workout-action-panel.component.html',
  styleUrls: ['./workout-action-panel.component.scss']
})
export class WorkoutActionPanelComponent implements OnInit {
  workout: Workout = new Workout('Chest and legs', 4, ['1', '2', '3']);
  exercises: Array<Exercise> = [
    new Exercise('Push ups', 'Do it slowly, touch the ground with your chest', 'repetition', 15, 3),
    new Exercise('Pull ups', '', 'repetition', 9, 4),
    new Exercise('Pistol squats', 'Try to hold a right angle', 'repetition', 4, 4),
  ];
  currentExercise: Exercise = this.exercises[0];
  unitWord: string = 'repetitions';

  constructor(
    private route: ActivatedRoute,
    private workoutService: WorkoutService,
  ) { }

  ngOnInit() {
    // const id = this.route.snapshot.params.id;
    // this.workout = this.workoutService.getWorkout(id);
  }

}
