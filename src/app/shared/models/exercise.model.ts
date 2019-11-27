import uuid from 'uuid';
import { Result } from './result.model';

export class Exercise {
  id: string = uuid();
  result: { succeeded?: boolean, results: Array<Result[]> } = {
    succeeded: false, results: [[]],
  };

  constructor(
    public name: string,
    public note: string = '',
    public unit: 'second' | 'repetition',
    public unitAmount: number,
    public roundAmount: number,
  ) { }

  clone() {
    const cloneExercise = {
      ...this,
      result: {
        succeeded: this.result.succeeded,
        results: this.result.results.map((resultArray) =>
          resultArray.map((result) => ({ ...result })))
      }
    };
    Object.setPrototypeOf(cloneExercise, Object.getPrototypeOf(this));

    return cloneExercise;
  }
}
