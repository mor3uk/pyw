import uuid from 'uuid';

export class Workout {
  completedAt: number;
  workoutTime: number;
  id: string = uuid();
  status: { completed: boolean, succeeded: boolean } = {
    completed: false, succeeded: null,
  }

  constructor(
    public createdAt: number,
    public muscleGroup: string,
    public rounds: number,
    public exercisesIdList: Array<string>,
  ) { }
}