import React from 'react';
import { Container } from '@/shared/components';
import { useSchedule } from '../hooks/useSchedule';
import { SchedulePresenter } from './SchedulePresenter';

const SchedulePage: React.FC = () => {
  const { currentMonth, schedule, nextMonth, prevMonth } = useSchedule();

  return (
    <Container size="full">
      <SchedulePresenter
        currentMonth={currentMonth}
        schedule={schedule}
        nextMonth={nextMonth}
        prevMonth={prevMonth}
      />
    </Container>
  );
};

export default SchedulePage;
