import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Exercise } from '../../../../shared/models/exercise.model';
import { ExerciseService } from '../../../../shared/services/exercise.service';

@Component({
  selector: 'app-exercise-item',
  templateUrl: './exercise-item.component.html',
  styleUrls: ['./exercise-item.component.scss']
})
export class ExerciseItemComponent implements OnInit {
  @Input() exercise: Exercise;
  roundWord: string = 'round';
  unitWord: string;

  constructor(
    private exerciseService: ExerciseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.unitWord = this.exercise.unit;
    if (this.exercise.unitAmount !== 1) { this.unitWord += 's'; }
    if (this.exercise.roundAmount !== 1) { this.roundWord += 's'; }
  }

  onRemoveExercise() {
    this.exerciseService.removeCurrentExercise(this.exercise.id);
    this.router.navigate(['workout', 'new']);
  }

}
