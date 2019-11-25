export interface ExerciseRoundsInfo {
  exerciseName: string,
  workoutRound: number,
  exerciseRound: number,
  exerciseUnits: number,
  actualUnits: number,
  exerciseTime: number,
  exerciseUnit: 'repetition' | 'second',
}