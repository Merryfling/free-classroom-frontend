"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ClassroomCard } from "@/components/classroom-card";
import { Calendar, Clock } from "lucide-react";

// 定义类型
interface ClassroomSchedule {
  room: string;
  freeSlots: number[];
  occupiedSlots: number[];
}

interface ApiResponse {
  status: number;
  message: string;
  data: ClassroomSchedule[];
}

export default function Home() {
  const [showOccupied, setShowOccupied] = useState<boolean>(false);
  const [schedules, setSchedules] = useState<ClassroomSchedule[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // 获取当前日期信息
  const getCurrentDateInfo = useCallback(() => {
    const now = new Date();
    const weekday = ['日', '一', '二', '三', '四', '五', '六'][now.getDay()];
    
    // 基于2024年12月9日为第15周计算当前周数
    const baseTime = new Date('2024-12-09');
    const weekDiff = Math.floor((now.getTime() - baseTime.getTime()) / (7 * 24 * 60 * 60 * 1000));
    const currentWeek = 15 + weekDiff;

    return {
      date: now.toLocaleDateString('zh-CN'),
      week: currentWeek,
      weekday: weekday
    };
  }, []);

  const dateInfo = getCurrentDateInfo();

  const fetchSchedules = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch('/api/schedules');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse = await response.json();
      if (result.status === 200) {
        setSchedules(result.data);
      } else {
        console.error('API error:', result.message);
      }
    } catch (error) {
      console.error('Error fetching schedules:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchSchedules();

    // 每两小时刷新一次数据（8:00-21:00）
    const checkAndScheduleRefresh = () => {
      const now = new Date();
      const hour = now.getHours();
      if (hour >= 8 && hour <= 21) {
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const msUntilNextHour = ((60 - minutes) * 60 - seconds) * 1000;
        setTimeout(() => {
          fetchSchedules();
          checkAndScheduleRefresh();
        }, msUntilNextHour);
      }
    };

    checkAndScheduleRefresh();

    return () => {
      // 清理定时器
      clearTimeout(checkAndScheduleRefresh as unknown as number);
    };
  }, [fetchSchedules]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 页面标题和日期信息 */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">教室课程表</h1>
          <div className="flex items-center justify-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{dateInfo.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>第{dateInfo.week}周 星期{dateInfo.weekday}</span>
            </div>
          </div>
        </div>

        {/* 控制栏 */}
        <div className="mb-8 flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
          <button
            onClick={() => void fetchSchedules()}
            disabled={isRefreshing}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            {isRefreshing ? '刷新中...' : '刷新数据'}
          </button>
          <div className="flex items-center gap-4">
            <Label htmlFor="show-occupied" className="text-sm font-medium">
              显示{showOccupied ? "占用" : "空闲"}时段
            </Label>
            <Switch
              id="show-occupied"
              checked={showOccupied}
              onCheckedChange={setShowOccupied}
            />
          </div>
        </div>

        {/* 教室卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schedules.map((schedule) => (
            <ClassroomCard
              key={schedule.room}
              schedule={schedule}
              showOccupied={showOccupied}
            />
          ))}
        </div>
      </div>
    </div>
  );
}