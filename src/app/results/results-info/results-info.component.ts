import { Component, OnInit } from '@angular/core';

import { ResultsService } from '../results.service';
import { Workout } from '../../shared/models/workout.model';
import { ExerciseRoundsInfo } from '../../shared/models/exercise-rounds-info.model';
import { ExerciseService } from '../../shared/services/exercise.service';
import { deepClone } from '../../shared/utils/deep-clone';

@Component({
  selector: 'app-results-info',
  templateUrl: './results-info.component.html',
  styleUrls: ['./results-info.component.scss']
})
export class ResultsInfoComponent implements OnInit {
  workoutRoundsInfo: Array<ExerciseRoundsInfo>[] = [];
  workout: Workout;

  constructor(
    private resultsService: ResultsService,
    private exerciseService: ExerciseService
  ) { }

  ngOnInit() {
    this.resultsService.workoutResultPicked
      .subscribe((workout: Workout) => {
        this.workout = workout;
        this.workoutRoundsInfo = [];
        
        if (workout.status.completed) {
          for (let i = 0; i < workout.rounds; i++) {

            workout.exercisesIdList.forEach((exerciseId) => {
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

              this.workoutRoundsInfo.push(deepClone(exerciseRoundsInfos));
            });

          }
        }
      });
  }

}
