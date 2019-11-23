import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Exercise } from '../models/exercise.model';
import { deepClone } from '../utils/deep-clone';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  exercisesChanged = new Subject<Exercise[]>();
  exercises: Array<Exercise> = [];
  currentExercises: Array<Exercise> = [];

  addExercise(exercise: Exercise): void {
    this.currentExercises.push(exercise);
    this.exercisesChanged.next(deepClone(this.currentExercises));
  }

  getExercises(): Array<Exercise> {
    return deepClone(this.exercises);
  }

  getCurrentExercises(): Array<Exercise> {
    return deepClone(this.currentExercises);
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
    this.exercisesChanged.next(deepClone(this.currentExercises));
  }

  rewriteExercises(exercisesToRewrite: Array<Exercise>) {
    this.exercises = this.exercises.map((exercise) => {
      const exerciseToRewrite = exercisesToRewrite
        .find((exerciseToRewrite) => exerciseToRewrite.id === exercise.id);

      return exerciseToRewrite || exercise;
    });
  }

  emptyCurrentExercises() {
    this.currentExercises = [];
  }

  saveExercises() {
    this.exercises = deepClone(this.currentExercises);
  }

  removeCurrentExercise(id: string) {
    this.currentExercises = this.currentExercises
      .filter((exercise) => id !== exercise.id);
    this.exercisesChanged.next(deepClone(this.currentExercises));
  }
}