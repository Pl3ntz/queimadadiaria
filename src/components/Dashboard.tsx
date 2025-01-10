import React from 'react';
import { WorkoutDay } from '../types';
import { Target, Flame, Calendar as CalendarIcon, Percent } from 'lucide-react';
import { differenceInDays, parseISO, isBefore, isAfter } from 'date-fns';

interface DashboardProps {
  workoutDays: WorkoutDay[];
  daysPerWeek: number;
  startDate: string;
}

export function Dashboard({ workoutDays, daysPerWeek, startDate }: DashboardProps) {
  const today = new Date();
  const startDateObj = parseISO(startDate);
  
  // Only count workouts after the start date
  const validWorkouts = workoutDays.filter(day => {
    const workoutDate = parseISO(day.date);
    return day.attended && 
           !isBefore(workoutDate, startDateObj) && 
           !isAfter(workoutDate, today);
  });
  
  const totalWorkouts = validWorkouts.length;
  const daysSinceStart = Math.max(0, differenceInDays(today, startDateObj));
  const expectedWorkouts = Math.floor((daysSinceStart + 1) * (daysPerWeek / 7));
  const attendanceRate = expectedWorkouts > 0 ? (totalWorkouts / expectedWorkouts) * 100 : 0;
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-4 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-5 h-5" />
          <h3 className="text-sm font-medium">Meta Semanal</h3>
        </div>
        <p className="text-2xl font-bold">{daysPerWeek}x</p>
      </div>
      
      <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-4 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Flame className="w-5 h-5" />
          <h3 className="text-sm font-medium">Total Treinos</h3>
        </div>
        <p className="text-2xl font-bold">{totalWorkouts}</p>
      </div>
      
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
        <div className="flex items-center gap-2 mb-2">
          <CalendarIcon className="w-5 h-5" />
          <h3 className="text-sm font-medium">Dias Ativos</h3>
        </div>
        <p className="text-2xl font-bold">{totalWorkouts}</p>
      </div>
      
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Percent className="w-5 h-5" />
          <h3 className="text-sm font-medium">Taxa Presença</h3>
        </div>
        <p className="text-2xl font-bold">{attendanceRate.toFixed(0)}%</p>
      </div>
    </div>
  );
}