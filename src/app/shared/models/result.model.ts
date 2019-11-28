export interface Result {
  workoutId: string,
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