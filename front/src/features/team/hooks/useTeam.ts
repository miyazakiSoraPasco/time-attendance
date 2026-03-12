import { useState } from 'react';
import type { TeamMember } from '@/domain/enums/team';

const MOCK_TEAM: TeamMember[] = [
  { id: '1', name: '佐藤 花子', role: 'マネージャー', department: '営業部', status: 'working', clockInTime: '08:52', email: 'h.sato@example.com' },
  { id: '2', name: '鈴木 一郎', role: 'リーダー', department: '営業部', status: 'working', clockInTime: '09:05', email: 'i.suzuki@example.com' },
  { id: '3', name: '伊藤 結衣', role: '正社員', department: '開発部', status: 'break', clockInTime: '09:30', email: 'y.ito@example.com' },
  { id: '4', name: '高橋 健太', role: '正社員', department: '開発部', status: 'working', clockInTime: '08:45', email: 'k.takahashi@example.com' },
  { id: '5', name: '渡辺 亮', role: '契約社員', department: '営業部', status: 'off', email: 'r.watanabe@example.com' },
  { id: '6', name: '小林 美咲', role: '正社員', department: '人事部', status: 'leave', email: 'm.kobayashi@example.com' },
  { id: '7', name: '中村 翼', role: '正社員', department: '開発部', status: 'working', clockInTime: '10:15', email: 't.nakamura@example.com' },
  { id: '8', name: '加藤 純一', role: 'インターン', department: '開発部', status: 'working', clockInTime: '09:00', email: 'j.kato@example.com' },
];

export const useTeam = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDept, setFilterDept] = useState('すべて');

  const filteredMembers = MOCK_TEAM.filter(member => {
    const matchesSearch = member.name.includes(searchQuery) || member.department.includes(searchQuery);
    const matchesDept = filterDept === 'すべて' || member.department === filterDept;
    return matchesSearch && matchesDept;
  });

  const stats = {
    total: MOCK_TEAM.length,
    working: MOCK_TEAM.filter(m => m.status === 'working').length,
    break: MOCK_TEAM.filter(m => m.status === 'break').length,
    leave: MOCK_TEAM.filter(m => m.status === 'leave').length,
  };

  const departments = ['すべて', ...Array.from(new Set(MOCK_TEAM.map(m => m.department)))];

  return {
    searchQuery,
    setSearchQuery,
    filterDept,
    setFilterDept,
    filteredMembers,
    stats,
    departments,
  };
};
