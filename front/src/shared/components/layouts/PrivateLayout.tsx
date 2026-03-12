import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/shared/components/sidebar/Sidebar";
import { type SidebarMenuItem } from "@/shared/components/sidebar/types";
import { Home, Clock, Calendar, FileText, Users, Settings } from "lucide-react";
import { cn } from "@/shared/utils/style";

// 仮のログイン情報
const user = {
    name: "TODO",
    email: "taro@example.com",
    avatar: undefined,
};

const defaultMenuItems: SidebarMenuItem[] = [
    { icon: Home, label: "ダッシュボード", href: "/dashboard" },
    { icon: Clock, label: "打刻", href: "/attendance" },
    { icon: Calendar, label: "スケジュール", href: "/schedule" },
    { icon: FileText, label: "申請・承認", href: "/approval" },
    { icon: Users, label: "チーム管理", href: "/team" },
    { icon: Settings, label: "設定", href: "/settings" },
];

export const PrivateLayout = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const handleLogout = () => {
        console.log("ログアウト処理");
    };

    const handleProfileClick = () => {
        console.log("プロフィール編集");
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <div className={cn(
                "transition-all duration-300",
                sidebarCollapsed ? "w-20" : "w-64"
            )}>
                <Sidebar
                    user={user}
                    menuItems={defaultMenuItems}
                    isCollapsed={sidebarCollapsed}
                    onToggle={setSidebarCollapsed}
                    onLogout={handleLogout}
                    onProfileClick={handleProfileClick}
                />
            </div>
            
            <main className="flex-1 overflow-auto p-8">
                <Outlet />
            </main>
        </div>
    );
};
