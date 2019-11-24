export interface WorkoutFilters {
  muscleGroup?: string,
  status?: boolean,
  succeeded?: boolean,
  sortBy?: 'date-creation' | 'date-completion' | 'time-completion',
}