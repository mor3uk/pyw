import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Exercise } from '../../../shared/models/exercise.model';
import { ExerciseService } from '../../../shared/services/exercise.service';

@Component({
  selector: 'app-exercise-edit',
  templateUrl: './exercise-edit.component.html',
  styleUrls: ['./exercise-edit.component.scss']
})
export class ExerciseEditComponent implements OnInit {
  name: string;
  note: string;
  unit: 'repetition' | 'second' = 'repetition';
  unitAmount: number;
  roundAmount: number;
  editMode: boolean = false;

  constructor(private exerciseService: ExerciseService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) =>
      params.id && (this.editMode = true));
  }

  onAddExercise() {
    this.exerciseService.addExercise(new Exercise(
      this.name, this.note, this.unit, this.unitAmount, this.roundAmount
    ));
  }

}
