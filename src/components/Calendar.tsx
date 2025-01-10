import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isBefore, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { WorkoutDay } from '../types';
import { Circle, X } from 'lucide-react';

interface CalendarProps {
  workoutDays: WorkoutDay[];
  currentMonth: Date;
  onDayClick: (date: Date) => void;
  startDate: string;
}

export function Calendar({ workoutDays, currentMonth, onDayClick, startDate }: CalendarProps) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDateObj = parseISO(startDate);

  const weekDays = [
    { key: 'dom', label: 'D' },
    { key: 'seg', label: 'S' },
    { key: 'ter', label: 'T' },
    { key: 'qua', label: 'Q' },
    { key: 'qui', label: 'Q' },
    { key: 'sex', label: 'S' },
    { key: 'sab', label: 'S' }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold text-center mb-4 text-gray-800">
        {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
      </h2>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {weekDays.map((day) => (
          <div key={day.key} className="text-center text-sm font-medium text-gray-600">
            {day.label}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const workoutDay = workoutDays.find((wd) => 
            isSameDay(new Date(wd.date), day)
          );
          const isInPast = isBefore(day, new Date()) && isBefore(startDateObj, day);
          const shouldShowStatus = isBefore(day, new Date()) && !isBefore(day, startDateObj);
          
          return (
            <button
              key={day.toString()}
              onClick={() => shouldShowStatus && onDayClick(day)}
              disabled={!shouldShowStatus}
              className={`
                aspect-square p-1 rounded flex flex-col items-center justify-center relative
                ${isToday(day) ? 'bg-orange-50 ring-2 ring-orange-500' : ''}
                ${shouldShowStatus ? 'hover:bg-gray-50' : ''}
                ${isBefore(day, startDateObj) ? 'text-gray-300' : ''}
              `}
            >
              <span className={`text-sm ${isToday(day) ? 'font-bold' : ''}`}>
                {format(day, 'd')}
              </span>
              {shouldShowStatus && workoutDay && (
                <div className="mt-1">
                  {workoutDay.attended ? (
                    <Circle className="w-4 h-4 text-green-500" />
                  ) : (
                    <X className="w-4 h-4 text-red-500" />
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}