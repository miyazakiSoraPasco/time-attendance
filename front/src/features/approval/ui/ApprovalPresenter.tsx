import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Filter, Clock, CheckCircle2, XCircle, 
  AlertCircle, FileText, Calendar, MoreVertical, 
  ChevronRight, User, MessageSquare 
} from 'lucide-react';
import { Card, CardContent, Button, Badge, Typography } from '@/shared/components';
import type { AttendanceRequest, RequestStatus, RequestType } from '@/domain/enums/approval';

interface ApprovalPresenterProps {
  activeTab: 'my' | 'team';
  setActiveTab: (tab: 'my' | 'team') => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  requests: AttendanceRequest[];
  handleApprove: (id: string) => void;
  handleReject: (id: string) => void;
  teamPendingCount: number;
}

const getStatusInfo = (status: RequestStatus) => {
  switch (status) {
    case 'approved':
      return { label: '承認済み', variant: 'success' as const, icon: CheckCircle2 };
    case 'rejected':
      return { label: '却下', variant: 'destructive' as const, icon: XCircle };
    default:
      return { label: '承認待ち', variant: 'warning' as const, icon: Clock };
  }
};

const getTypeIcon = (type: RequestType) => {
  switch (type) {
    case 'leave': return <Calendar className="text-blue-500" size={18} />;
    case 'overtime': return <Clock className="text-orange-500" size={18} />;
    case 'correction': return <AlertCircle className="text-red-500" size={18} />;
    default: return <FileText className="text-gray-500" size={18} />;
  }
};

export const ApprovalPresenter: React.FC<ApprovalPresenterProps> = ({
  activeTab,
  setActiveTab,
  isModalOpen,
  setIsModalOpen,
  searchQuery,
  setSearchQuery,
  requests,
  handleApprove,
  handleReject,
  teamPendingCount,
}) => {
  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex bg-gray-100 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('my')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'my' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            自分の申請
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'team' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            承認待ち
            {teamPendingCount > 0 && (
              <span className="ml-2 px-1.5 py-0.5 bg-red-500 text-white text-[10px] rounded-full">
                {teamPendingCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="検索..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-full md:w-64"
            />
          </div>
          <Button variant="outline" className="rounded-xl gap-2 border-gray-200">
            <Filter size={16} />
            フィルタ
          </Button>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="rounded-xl gap-2 shadow-lg shadow-blue-100"
          >
            <Plus size={16} />
            新規申請
          </Button>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-3">
        {requests.map((request, index) => {
          const status = getStatusInfo(request.status);
          const StatusIcon = status.icon;
          
          return (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={request.id}
            >
              <Card className="border-none shadow-sm hover:shadow-md transition-shadow group overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 p-5">
                    {/* Icon & Title */}
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {getTypeIcon(request.type)}
                      </div>
                      <div>
                        <Typography variant="h3" className="font-bold text-gray-900 mb-0.5">{request.title}</Typography>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <User size={12} />
                            {request.applicant}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {request.date}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Comment */}
                    <div className="hidden lg:flex items-start gap-2 max-w-xs flex-1">
                      <MessageSquare size={14} className="text-gray-300 mt-0.5" />
                      <p className="text-xs text-gray-500 line-clamp-2 italic">
                        {request.comment || 'コメントなし'}
                      </p>
                    </div>

                    {/* Status & Actions */}
                    <div className="flex items-center justify-between md:justify-end gap-6 pt-4 md:pt-0 border-t md:border-t-0 border-gray-50">
                      <Badge variant={status.variant} className="flex items-center gap-1.5">
                        <StatusIcon size={14} />
                        {status.label}
                      </Badge>

                      <div className="flex items-center gap-2">
                        {activeTab === 'team' && request.status === 'pending' ? (
                          <>
                            <Button 
                              size="sm" 
                              onClick={() => handleApprove(request.id)}
                              className="h-9 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs"
                            >
                              承認
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleReject(request.id)}
                              className="h-9 px-4 border-red-200 text-red-600 hover:bg-red-50 rounded-lg text-xs"
                            >
                              却下
                            </Button>
                          </>
                        ) : (
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600 rounded-lg">
                            <MoreVertical size={18} />
                          </Button>
                        )}
                        <ChevronRight className="text-gray-300 hidden md:block" size={18} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Stats Cards (Bottom) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
        {[
          { label: '今月の有給取得', value: '2.0', unit: '日', color: 'blue' },
          { label: '有給残日数', value: '12.5', unit: '日', color: 'indigo' },
          { label: '残業申請合計', value: '14', unit: '時間', color: 'orange' },
          { label: '未承認の申請', value: '3', unit: '件', color: 'red' },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm p-5 bg-white">
            <p className="text-xs text-gray-500 font-medium mb-1">{stat.label}</p>
            <div className="flex items-baseline gap-1">
              <span className={`text-2xl font-black text-blue-600`}>{stat.value}</span>
              <span className="text-xs text-gray-400">{stat.unit}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
