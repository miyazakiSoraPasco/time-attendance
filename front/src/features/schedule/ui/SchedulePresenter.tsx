import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar as CalendarIcon, ChevronLeft, ChevronRight, 
  Download, Filter, Clock, MapPin, Info, 
  CheckCircle2, Coffee, AlertCircle, FileText 
} from 'lucide-react';
import { Card, CardContent, Button, Typography, Badge } from '@/shared/components';
import type { DaySchedule } from '@/domain/enums/schedule';

interface SchedulePresenterProps {
  currentMonth: Date;
  schedule: DaySchedule[];
  nextMonth: () => void;
  prevMonth: () => void;
}

const getStatusStyles = (status: DaySchedule['status']) => {
  switch (status) {
    case 'working':
      return { border: 'border-l-4 border-blue-500', bg: 'bg-white', text: 'text-gray-900', badge: 'default' as const };
    case 'holiday':
      return { border: 'border-l-4 border-red-500', bg: 'bg-red-50/30', text: 'text-red-700', badge: 'destructive' as const };
    case 'off':
      return { border: 'border-l-4 border-gray-300', bg: 'bg-gray-50/50', text: 'text-gray-400', badge: 'outline' as const };
    default:
      return { border: 'border-l-4 border-amber-500', bg: 'bg-amber-50/30', text: 'text-amber-700', badge: 'warning' as const };
  }
};

export const SchedulePresenter: React.FC<SchedulePresenterProps> = ({
  currentMonth,
  schedule,
  nextMonth,
  prevMonth,
}) => {
  const monthName = currentMonth.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long' });

  return (
    <div className="space-y-8">
      {/* Calendar Header */}
      <Card className="border-none shadow-sm rounded-[2.5rem] bg-white overflow-hidden">
        <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-100">
              <CalendarIcon size={24} />
            </div>
            <div>
              <Typography variant="h2" className="text-2xl font-bold text-gray-900">{monthName}</Typography>
              <p className="text-sm text-gray-500 font-medium italic">Your Work Schedule</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-100 p-1.5 rounded-2xl">
            <Button variant="ghost" size="icon" onClick={prevMonth} className="h-10 w-10 rounded-xl hover:bg-white hover:shadow-sm text-gray-500">
              <ChevronLeft size={20} />
            </Button>
            <span className="px-4 text-sm font-bold text-gray-700">{monthName}</span>
            <Button variant="ghost" size="icon" onClick={nextMonth} className="h-10 w-10 rounded-xl hover:bg-white hover:shadow-sm text-gray-500">
              <ChevronRight size={20} />
            </Button>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl gap-2 border-gray-200">
              <Filter size={18} />
              表示切替
            </Button>
            <Button className="rounded-xl gap-2 shadow-lg shadow-blue-100">
              <Download size={18} />
              エクスポート
            </Button>
          </div>
        </div>
      </Card>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 rounded-3xl">
          <p className="text-blue-100 text-sm font-medium mb-1">今月の総労働時間</p>
          <Typography variant="h2" className="text-4xl font-black mb-6">154.5h</Typography>
          <div className="flex items-center gap-2 text-xs font-bold bg-white/20 w-fit px-3 py-1 rounded-full">
            <Info size={14} />
            所定: 160h に対し 96%
          </div>
        </Card>

        <Card className="border-none shadow-sm p-8 rounded-3xl bg-white">
          <p className="text-gray-500 text-sm font-medium mb-1">今月の残業時間</p>
          <Typography variant="h2" className="text-4xl font-black text-gray-900 mb-6">12.0h</Typography>
          <div className="flex items-center gap-4 text-xs font-bold text-orange-500">
            <span className="flex items-center gap-1"><Clock size={14} /> 定内: 8h</span>
            <span className="flex items-center gap-1"><AlertCircle size={14} /> 定外: 4h</span>
          </div>
        </Card>

        <Card className="border-none shadow-sm p-8 rounded-3xl bg-white">
          <p className="text-gray-500 text-sm font-medium mb-1">有給取得日数</p>
          <Typography variant="h2" className="text-4xl font-black text-blue-600 mb-6">2.0日</Typography>
          <div className="text-xs font-bold text-blue-400">
            残り: 12.5日
          </div>
        </Card>
      </div>

      {/* Schedule Grid/List */}
      <div className="space-y-3">
        {schedule.map((day, index) => {
          const styles = getStatusStyles(day.status);
          return (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.02 }}
              key={day.date}
            >
              <Card className={`border-none shadow-sm hover:shadow-md transition-all ${day.isToday ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}>
                <CardContent className={`p-0 ${styles.bg}`}>
                  <div className={`flex flex-col md:flex-row md:items-center gap-6 p-5 ${styles.border}`}>
                    {/* Date & Day */}
                    <div className="w-20 text-center md:text-left">
                      <p className="text-lg font-black text-gray-900 tracking-tight">{day.date}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{day.isToday ? 'Today' : 'Weekday'}</p>
                    </div>

                    {/* Shift Info */}
                    <div className="flex-1 flex flex-col md:flex-row md:items-center gap-6">
                      <div>
                        <p className={`text-sm font-bold ${styles.text}`}>{day.shift || (day.status === 'off' ? '公休日' : '休み')}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1 text-[11px] font-medium text-gray-400">
                            <Clock size={12} />
                            {day.timeRange || '--:-- - --:--'}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] font-medium text-gray-400">
                            <MapPin size={12} />
                            Office-A
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 hidden md:block">
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                          {day.status === 'working' && <div className="h-full w-full bg-blue-500/30" />}
                        </div>
                      </div>
                    </div>

                    {/* Status & Action */}
                    <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-none border-gray-100 pt-4 md:pt-0">
                      <Badge variant={styles.badge}>
                        {day.status === 'working' ? '出社' : day.status === 'off' ? '公休' : '休暇'}
                      </Badge>
                      <Button variant="ghost" size="sm" className="text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-lg">
                        詳細
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
