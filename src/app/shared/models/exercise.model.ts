import uuid from 'uuid';
import { Result } from './result.model';

export class Exercise {
  id: string = uuid();
  result: { succeeded?: boolean, results: Array<Result[]> } = {
    succeeded: false, results: [[]],
  };
  resetResults: Function = function () {
    this.result.results = [];
  };

  constructor(
    public name: string,
    public note: string,
    public unit: 'second' | 'repetition',
    public unitAmount: number,
    public roundAmount: number,
  ) {
    this.note = note ? !note.trim() ? 'No note provided...' : note : 'No note provided...';
  }
}
