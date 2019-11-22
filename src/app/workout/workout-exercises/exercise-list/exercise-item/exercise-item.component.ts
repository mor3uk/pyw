import { Component, OnInit, Input } from '@angular/core';
import { Exercise } from 'src/app/shared/models/exercise.model';

@Component({
  selector: 'app-exercise-item',
  templateUrl: './exercise-item.component.html',
  styleUrls: ['./exercise-item.component.scss']
})
export class ExerciseItemComponent implements OnInit {
  @Input() exercise: Exercise;
  roundWord: string = 'round';
  unitWord: string;

  constructor() { }

  ngOnInit() {
    this.unitWord = this.exercise.unit;
    if (this.exercise.unitAmount !== 1) { this.unitWord += 's'; }
    if (this.exercise.roundAmount !== 1) { this.roundWord += 's'; }
  }

}
