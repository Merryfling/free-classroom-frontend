"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, RefreshCw } from "lucide-react";
import { useState } from "react";

interface DateControlsProps {
  currentWeek: number;
  onWeekChange: (week: number) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export function DateControls({ 
  currentWeek, 
  onWeekChange, 
  onRefresh,
  isRefreshing 
}: DateControlsProps) {
  const [week, setWeek] = useState(currentWeek);

  const handleWeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWeek = parseInt(e.target.value);
    if (!isNaN(newWeek) && newWeek > 0) {
      setWeek(newWeek);
      onWeekChange(newWeek);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Calendar className="w-6 h-6" />
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">第</span>
        <Input
          type="number"
          value={week}
          onChange={handleWeekChange}
          className="w-20"
          min="1"
        />
        <span className="text-sm font-medium">周</span>
      </div>
      <Button 
        variant="outline" 
        size="icon"
        onClick={onRefresh}
        disabled={isRefreshing}
      >
        <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
      </Button>
    </div>
  );
}