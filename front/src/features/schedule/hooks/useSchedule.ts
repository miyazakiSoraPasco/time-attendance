import { useState } from 'react';
import type { DaySchedule } from '@/domain/enums/schedule';

const generateMockSchedule = (): DaySchedule[] => {
  const days: DaySchedule[] = [];
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    days.push({
      date: `${month + 1}/${i}`,
      status: isWeekend ? 'off' : 'working',
      shift: isWeekend ? undefined : '通常勤務',
      timeRange: isWeekend ? undefined : '09:00 - 18:00',
      isToday: i === now.getDate(),
    });
  }
  return days;
};

export const useSchedule = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const schedule = generateMockSchedule();

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
  };

  return {
    currentMonth,
    schedule,
    nextMonth,
    prevMonth,
  };
};
