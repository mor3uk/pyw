import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Exercise } from '../../../shared/models/exercise.model';
import { ExerciseService } from 'src/app/shared/services/exercise.service';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit {
  exercises: Array<Exercise> = [];

  constructor(private route: ActivatedRoute,
    private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.exerciseService.exercisesChanged
      .subscribe((exercises) => this.exercises = exercises);
  }

}
