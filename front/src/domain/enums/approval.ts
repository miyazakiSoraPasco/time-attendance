export type RequestStatus = 'pending' | 'approved' | 'rejected';
export type RequestType = 'leave' | 'overtime' | 'correction' | 'business-trip';

export interface AttendanceRequest {
  id: string;
  type: RequestType;
  title: string;
  applicant: string;
  date: string;
  status: RequestStatus;
  comment?: string;
}
