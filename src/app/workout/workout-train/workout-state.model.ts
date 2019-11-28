import { Exercise } from 'src/app/shared/models/exercise.model';

export interface WorkoutState {
  id: string,
  exercises: Exercise[],
  currentExercise: Exercise,
  workoutTimerValue: number,
  currentUnitNumber: number,
  exerciseFinishedRounds: number,
  workoutFinishedRounds: number,
  workoutFinished: boolean,
  isSuccess: boolean,
}