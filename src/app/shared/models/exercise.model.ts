export interface Exercise {
  id: string,
  name: string,
  note?: string,
  unitType: 'second' | 'repetition',
  unitNumber: number,
  roundsNumber: number,
}