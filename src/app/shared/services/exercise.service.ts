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

  getCurrentExerciseById(id: string): Exercise {
    return this.currentExercises.find((exercise) => exercise.id === id);
  }

  editCurrentExercise(id: string, changes: object) {
    this.currentExercises = this.currentExercises.map((exercise) => {
      return exercise.id === id ? { ...exercise, ...changes } : exercise;
    });
    this.exercisesChanged.next(this.currentExercises.slice());
  }

  emptyCurrentExercises() {
    this.currentExercises = [];
  }

  saveExercises() {
    this.exercises = this.currentExercises.slice();
  }
}