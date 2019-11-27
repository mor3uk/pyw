import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Workout } from '../../shared/models/workout.model';
import { ExerciseRoundsInfo } from '../../shared/models/exercise-rounds-info.model';
import { ExerciseService } from '../../shared/services/exercise.service';
import { WorkoutService } from '../../shared/services/workout.service';

@Component({
  selector: 'app-results-info',
  templateUrl: './results-info.component.html',
  styleUrls: ['./results-info.component.scss']
})
export class ResultsInfoComponent implements OnInit {
  workoutRoundsInfo: Array<ExerciseRoundsInfo>[] = [];
  workout: Workout;

  constructor(
    private exerciseService: ExerciseService,
    private workoutService: WorkoutService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(({ id } = {}) => {
      if (!id) {
        return;
      }

      this.workout = this.workoutService.getWorkout(id);
      this.workoutRoundsInfo = [];

      if (!this.workout.status.completed) {
        return;
      }

      for (let i = 0; i < this.workout.rounds; i++) {
        this.workout.exercisesIdList.forEach((exerciseId) => {
          let exerciseRoundsInfos: Array<ExerciseRoundsInfo> = [];
          let exercise = this.exerciseService.getExerciseById(exerciseId);

          for (let j = 0; j < exercise.roundAmount; j++) {
            exerciseRoundsInfos.push({
              exerciseName: exercise.name,
              workoutRound: i + 1,
              exerciseRound: j + 1,
              exerciseUnits: exercise.unitAmount,
              actualUnits: exercise.result.results[i][j].units,
              exerciseTime: exercise.result.results[i][j].time,
              exerciseUnit: exercise.unit,
            });
          }

          this.workoutRoundsInfo.push(
            exerciseRoundsInfos.map((item) => ({ ...item }))
          );
        });
      }
    })
  }

}
