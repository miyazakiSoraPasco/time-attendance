import React from 'react';
import { Container } from '@/shared/components';
import { useAttendance } from '../hooks/useAttendance';
import { AttendancePresenter } from './AttendancePresenter';

const AttendancePage: React.FC = () => {
  const { status, currentTime, lastAction, handleAction } = useAttendance();

  return (
    <Container size="full">
      <AttendancePresenter
        status={status}
        currentTime={currentTime}
        lastAction={lastAction}
        onAction={handleAction}
      />
    </Container>
  );
};

export default AttendancePage;
