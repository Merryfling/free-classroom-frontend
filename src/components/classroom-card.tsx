"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ClassroomSchedule {
  room: string;
  freeSlots: number[];
  occupiedSlots: number[];
}

interface ClassroomCardProps {
  schedule: ClassroomSchedule;
  showOccupied: boolean;
}

// 获取时间段的起止时间
const getTimeRange = (start: number, end: number): string => {
  const timeMap: Record<number, { start: string; end: string }> = {
    1: { start: "8:30", end: "9:15" },
    2: { start: "9:25", end: "10:10" },
    3: { start: "10:30", end: "11:15" },
    4: { start: "11:25", end: "12:10" },
    5: { start: "14:00", end: "14:45" },
    6: { start: "14:55", end: "15:40" },
    7: { start: "16:00", end: "16:45" },
    8: { start: "16:55", end: "17:40" },
    9: { start: "19:00", end: "19:45" },
    10: { start: "19:55", end: "20:40" },
    11: { start: "20:50", end: "21:35" },
    12: { start: "21:45", end: "22:30" }
  };

  const startTime = timeMap[start]?.start || `第${start}节`;
  const endTime = timeMap[end]?.end || `第${end}节`;
  return `${startTime}-${endTime}`;
};

export function ClassroomCard({ schedule, showOccupied }: ClassroomCardProps): React.ReactElement {
  const slots = showOccupied ? schedule.occupiedSlots : schedule.freeSlots;
  const slotStatus = showOccupied ? "占用" : "空闲";

  // 将时间段数组转换为连续区间
  const getTimeRanges = (slots: number[]): [number, number][] => {
    if (slots.length === 0) return [];
    
    const sortedSlots = [...slots].sort((a, b) => a - b);
    const ranges: [number, number][] = [];
    let start = sortedSlots[0];
    let prev = start;

    for (let i = 1; i <= sortedSlots.length; i++) {
      const current = sortedSlots[i];
      if (current !== prev + 1) {
        ranges.push([start, prev]);
        start = current;
      }
      prev = current;
    }

    // 确保最后一个区间被添加
    if (start === prev && !ranges.find(r => r[0] === start)) {
      ranges.push([start, prev]);
    }

    return ranges;
  };

  const timeRanges = getTimeRanges(slots);

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold tracking-tight">
          {schedule.room}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {timeRanges.length > 0 ? (
            <div className="space-y-1.5">
              {timeRanges.map(([start, end], index) => (
                <div
                  key={index}
                  className={`px-3 py-2 rounded-md ${
                    showOccupied
                      ? "bg-red-50 text-red-900 border border-red-200"
                      : "bg-green-50 text-green-900 border border-green-200"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">第 {start}-{end} 节</span>
                    <span className="text-sm">
                      {getTimeRange(start, end)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground text-center py-4">
              无{slotStatus}时段
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}