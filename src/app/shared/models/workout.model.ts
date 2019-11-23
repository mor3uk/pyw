import uuid from 'uuid';
import moment from 'moment';

export class Workout {
  completedAt: number;
  workoutTime: number;
  createdAt: number = +moment();
  id: string = uuid();
  status: { completed: boolean, succeeded: boolean } = {
    completed: false, succeeded: null,
  }

  constructor(
    public muscleGroup: string = '',
    public rounds: number,
    public exercisesIdList: Array<string>,
  ) { }
}