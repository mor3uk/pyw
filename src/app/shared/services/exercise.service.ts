import { Exercise } from '../models/exercise.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  exercisesChanged = new Subject<Exercise[]>();
  exercises: Array<Exercise> = [];


  addExercise(exercise: Exercise): void {
    this.exercises.push(exercise);
    this.exercisesChanged.next(this.exercises.slice());
  }

  getExercises(): Array<Exercise> {
    return this.exercises.slice();
  }

  getExerciseById(id: string) {
    return this.exercises.find((exercise) => exercise.id === id);
  }
}