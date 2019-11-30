import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ExerciseService } from '../../../shared/services/exercise.service';
import { Exercise } from '../../../shared/models/exercise.model';

@Component({
  selector: 'app-exercise-item',
  templateUrl: './exercise-item.component.html',
  styleUrls: ['./exercise-item.component.scss']
})
export class ExerciseItemComponent implements OnInit, OnDestroy {
  @Input() exercise: Exercise;
  editMode: boolean;
  editModeSubscription: Subscription;

  constructor(
    private exerciseService: ExerciseService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.editModeSubscription = this.exerciseService.exerciseEditModeChanged
      .subscribe((editMode) => this.editMode = editMode);
  }

  onRemoveExercise() {
    if (!this.editMode) {
      this.exerciseService.removeCurrentExercise(this.exercise.id);
      this.router.navigate(['workout', 'exercises']);
    }
  }

  ngOnDestroy() {
    this.editModeSubscription.unsubscribe();
  }

}
