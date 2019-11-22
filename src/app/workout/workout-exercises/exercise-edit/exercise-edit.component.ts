import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
  id: string;

  constructor(
    private exerciseService: ExerciseService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (this.id = params.id) {
        this.editMode = true;
        const exercise = this.exerciseService.getExerciseById(this.id);
        this.name = exercise.name;
        this.note = exercise.note === 'No note provided...' ? '' : exercise.note;
        this.unit = exercise.unit;
        this.unitAmount = exercise.unitAmount;
        this.roundAmount = exercise.roundAmount;
      }
    });
  }

  private setDefaultFields() {
    this.name = '';
    this.note = '';
    this.unit = 'repetition';
    this.unitAmount = 0;
    this.roundAmount = 0;
  }

  onAddExercise() {
    this.exerciseService.addExercise(new Exercise(
      this.name, this.note, this.unit, this.unitAmount, this.roundAmount
    ));
    this.setDefaultFields();
  }

  onSaveChanges() {
    this.note = !this.note.trim() ? 'No note provided...' : this.note;
    this.exerciseService.editExercise(this.id, {
      name: this.name, note: this.note, unit: this.unit,
      unitAmount: this.unitAmount, roundAmount: this.roundAmount
    });
    this.router.navigate(['workout', 'new']);
  }

}
