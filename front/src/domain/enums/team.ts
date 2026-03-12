export type MemberStatus = 'working' | 'break' | 'off' | 'leave';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  status: MemberStatus;
  clockInTime?: string;
  email: string;
  avatar?: string;
}
