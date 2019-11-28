export interface Workout {
  id: string,
  completedAt?: number,
  createdAt: number
  muscleGroup: string,
  roundsNumber: number,
  exercisesIdList: string[],
  status: {
    completed: boolean,
    succeeded: boolean,
  },
}