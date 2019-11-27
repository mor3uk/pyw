import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Exercise } from '../../../shared/models/exercise.model';
import { ExerciseService } from '../../../shared/services/exercise.service';

@Component({
  selector: 'app-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss']
})
export class ExerciseFormComponent implements OnInit {
  editMode: boolean = false;
  id: string;
  exerciseForm: FormGroup;

  constructor(
    private exerciseService: ExerciseService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.exerciseForm = new FormGroup({
      'name': new FormControl('', [
        Validators.required,
        Validators.maxLength(25)
      ]),
      'note': new FormControl('', Validators.maxLength(80)),
      'roundAmount': new FormControl(1, [
        Validators.required,
        Validators.min(1),
        Validators.max(5),
        Validators.pattern(/^\d*$/),
      ]),
      'unit': new FormControl('repetition', [
        Validators.required,
        Validators.pattern(/^repetition|second$/)]
      ),
      'unitAmount': new FormControl(1, [
        Validators.required,
        Validators.min(1),
        Validators.max(200),
        Validators.pattern(/^\d*$/),
      ]),
    });

    this.route.params.subscribe((params: Params) => {
      if (this.id = params.id) {
        this.editMode = true;
        const exercise = this.exerciseService.getCurrentExerciseById(this.id);

        this.exerciseForm.setValue({
          'name': exercise.name,
          'note': exercise.note && exercise.note.trim(),
          'roundAmount': exercise.roundAmount,
          'unit': exercise.unit,
          'unitAmount': exercise.unitAmount,
        });
      }
    });
  }

  onSubmit() {
    if (this.exerciseForm.valid) {
      this.editMode ? this.saveChanges() : this.addExercise();
    }
  }

  addExercise() {
    this.exerciseService.addExercise(new Exercise(
      this.exerciseForm.value.name,
      this.exerciseForm.value.note,
      this.exerciseForm.value.unit,
      this.exerciseForm.value.unitAmount,
      this.exerciseForm.value.roundAmount,
    ));
    this.exerciseForm.reset({
      'name': '',
      'note': '',
      'roundAmount': 1,
      'unit': 'repetition',
      'unitAmount': 1,
    });
  }

  saveChanges() {
    this.exerciseService.editCurrentExercise(this.id, this.exerciseForm.value);
    this.router.navigate(['workout', 'exercises']);
  }

}
