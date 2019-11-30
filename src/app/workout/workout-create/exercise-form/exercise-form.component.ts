import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import uuid from 'uuid';

import { ExerciseService } from '../../../shared/services/exercise.service';
import { CanDeactivateComponent } from '../../../shared/guards/can-deactivate-guard.service';

@Component({
  selector: 'app-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss']
})
export class ExerciseFormComponent implements OnInit, CanDeactivateComponent {
  editMode: boolean = false;
  id: string;
  exerciseForm: FormGroup;
  stateChanged: boolean = false;

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
      'roundsNumber': new FormControl(1, [
        Validators.required,
        Validators.min(1),
        Validators.max(5),
        Validators.pattern(/^\d*$/),
      ]),
      'unitType': new FormControl('repetition', [
        Validators.required,
        Validators.pattern(/^repetition|second$/)]
      ),
      'unitNumber': new FormControl(1, [
        Validators.required,
        Validators.min(1),
        Validators.max(200),
        Validators.pattern(/^\d*$/),
      ]),
    });

    this.exerciseForm.valueChanges.subscribe(() => this.stateChanged = true);

    this.route.params.subscribe((params: Params) => {
      if (this.id = params.id) {
        this.editMode = true;
        const exercise = this.exerciseService.getCurrentExerciseById(this.id);

        this.exerciseForm.setValue({
          'name': exercise.name,
          'note': exercise.note && exercise.note.trim(),
          'roundsNumber': exercise.roundsNumber,
          'unitType': exercise.unitType,
          'unitNumber': exercise.unitNumber,
        });
      }

      this.stateChanged = false;
      this.exerciseService.exerciseEditModeChanged.next(this.editMode);
    });
  }

  onSubmit() {
    if (this.exerciseForm.valid) {
      this.editMode ? this.saveChanges() : this.addExercise();
    }
  }

  addExercise() {
    this.exerciseService.addExercise({
      id: uuid(),
      name: this.exerciseForm.value.name,
      note: this.exerciseForm.value.note,
      unitType: this.exerciseForm.value.unitType,
      unitNumber: this.exerciseForm.value.unitNumber,
      roundsNumber: this.exerciseForm.value.roundsNumber,
    });
    this.exerciseForm.reset({
      'name': '',
      'note': '',
      'roundsNumber': 1,
      'unitType': 'repetition',
      'unitNumber': 1,
    });
  }

  saveChanges() {
    this.exerciseService.editCurrentExercise(this.id, this.exerciseForm.value);
    this.editMode = false;
    this.exerciseService.exerciseEditModeChanged.next(this.editMode);
    this.router.navigate(['workout', 'exercises']);
  }

  canDeactivate() {
    if (this.stateChanged && this.editMode) {
      return confirm('Do you really want to discard the changes?');
    }

    return true;
  }

}
