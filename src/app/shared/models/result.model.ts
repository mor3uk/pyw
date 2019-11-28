export interface Result {
  workoutId: string,
  duration?: number,
  exerciseRoundsGroups?: [
    [
      {
        exerciseId: string,
        exerciseRound: number,
        exerciseDuration: number,
        workoutRound: number,
        actualUnitNumber: number,
      }
    ] 
  ]
}