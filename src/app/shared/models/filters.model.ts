export enum sortBy {
  DATE_CREATION,
  DATE_COMPLETION,
  DURATION,
};

export interface Filters {
  muscleGroup?: string,
  status?: boolean,
  succeeded?: boolean,
  sortBy?: sortBy,
  sortReverse: boolean,
}