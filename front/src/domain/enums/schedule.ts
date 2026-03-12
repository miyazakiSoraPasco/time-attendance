export interface DaySchedule {
  date: string;
  status: 'working' | 'off' | 'holiday' | 'pending';
  shift?: string;
  timeRange?: string;
  isToday?: boolean;
}
