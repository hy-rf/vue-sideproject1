export default interface Schedule {
  id: string
  productName: string
  operatingLine: string
  cycleTime: number
  efficiency: number
  uph: number
  workingHoursPerDay: number
  upd: number
  minimumWorkingDays: number
  minimumLotSize: number
  createdAt: Date
  notes?: string
}
