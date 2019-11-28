import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Exercise } from '../models/exercise.model';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  exercisesChanged = new Subject();
  exercises: Exercise[] = [];
  currentExercises: Exercise[] = [];

  constructor() {
    try {
      const exercisesJSON = localStorage.getItem('exercises');
      if (exercisesJSON) {
        this.exercises = JSON.parse(exercisesJSON);
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
    return this.exercises.map((exercise) => ({ ...exercise }));
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
    this.currentExercises.forEach((exercise, i) => {
      if (exercise.id === id) {
        this.currentExercises[i] = { ...exercise, ...changes };
      }
    });

    this.exercisesChanged.next();
  }

  rewriteExercises(exercisesToRewrite: Exercise[]) {
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
      ...this.currentExercises.map((exercise) => ({ ...exercise }))
    ];
    this.emptyCurrentExercises();

    localStorage.setItem('exercises', JSON.stringify(this.exercises));
  }

  removeExercisesByIdList(ids: string[]) {
    this.exercises = this.exercises.filter((exercise) => {
      return !ids.includes(exercise.id);
    });

    localStorage.setItem('exercises', JSON.stringify(this.exercises));
  }

  removeCurrentExercise(id: string) {
    this.currentExercises = this.currentExercises
      .filter((exercise) => id !== exercise.id);

    this.exercisesChanged.next();
  }
}