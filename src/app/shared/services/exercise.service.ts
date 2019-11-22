import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Exercise } from '../models/exercise.model';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  exercisesChanged = new Subject<Exercise[]>();
  exercises: Array<Exercise> = [];
  currentExercises: Array<Exercise> = [];

  addExercise(exercise: Exercise): void {
    this.currentExercises.push(exercise);
    this.exercises.push(exercise);
    this.exercisesChanged.next(this.currentExercises.slice());
  }

  getExercises(): Array<Exercise> {
    return this.exercises.slice();
  }

  getCurrentExercises(): Array<Exercise> {
    return this.currentExercises.slice();
  }

  getExerciseById(id: string): Exercise {
    return this.exercises.find((exercise) => exercise.id === id);
  }

  editExercise(id: string, changes: object) {
    this.exercises = this.exercises.map((exercise) => {
      return exercise.id === id ? { ...exercise, ...changes } : exercise;
    });
    this.currentExercises = this.exercises.map((exercise) => {
      return exercise.id === id ? { ...exercise, ...changes } : exercise;
    });
    this.exercisesChanged.next(this.currentExercises.slice());
  }

  emptyCurrentExercises() {
    this.currentExercises = [];
  }
}