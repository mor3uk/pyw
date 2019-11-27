import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Exercise } from '../models/exercise.model';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  exercisesChanged = new Subject();
  exercises: Array<Exercise> = [];
  currentExercises: Array<Exercise> = [];

  constructor() {
    try {
      const exercisesJSON = localStorage.getItem('exercises');
      if (exercisesJSON) {
        const emptyExercises = JSON.parse(exercisesJSON);
        this.exercises = emptyExercises.map((exercise) => {
          Object.setPrototypeOf(exercise, Exercise.prototype);
          return exercise;
        })
      } else {
        this.exercises = [];
      }
    } catch (e) {
      this.exercises = [];
    }
  }

  addExercise(exercise: Exercise): void {
    this.currentExercises.push(exercise);
    this.exercisesChanged.next();
  }

  getExercises(): Array<Exercise> {
    return this.exercises.map((exercise) => {
      return exercise.clone();
    });
  }

  getCurrentExercises(): Array<Exercise> {
    return this.currentExercises;
  }

  getExerciseById(id: string): Exercise {
    return this.exercises.find((exercise) => exercise.id === id);
  }

  getCurrentExerciseById(id: string): Exercise {
    return this.currentExercises.find((exercise) => exercise.id === id);
  }

  editCurrentExercise(id: string, changes: object) {
    this.currentExercises = this.currentExercises.map((exercise) => {
      return exercise.id === id ? Object.assign(exercise, changes) : exercise;
    });
    this.exercisesChanged.next();
  }

  rewriteExercises(exercisesToRewrite: Array<Exercise>) {
    this.exercises = this.exercises.map((exercise) => {
      const exerciseToRewrite = exercisesToRewrite
        .find((exerciseToRewrite) => exerciseToRewrite.id === exercise.id);

      return exerciseToRewrite || exercise;
    });

    localStorage.setItem('exercises', JSON.stringify(this.exercises));
  }

  emptyCurrentExercises() {
    this.currentExercises = [];
  }

  saveExercises() {
    this.exercises = [
      ...this.exercises,
      ...this.currentExercises.map((exercise) => exercise.clone())
    ];
    this.emptyCurrentExercises();

    localStorage.setItem('exercises', JSON.stringify(this.exercises));
  }

  removeCurrentExercise(id: string) {
    this.currentExercises = this.currentExercises
      .filter((exercise) => id !== exercise.id);
    this.exercisesChanged.next();
  }
}