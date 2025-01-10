import React, { useState, useEffect } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { Setup } from './components/Setup';
import { Calendar } from './components/Calendar';
import { Dashboard } from './components/Dashboard';
import { WorkoutModal } from './components/WorkoutModal';
import { WorkoutDay, UserPreferences } from './types';

function App() {
  const [preferences, setPreferences] = useState<UserPreferences | null>(() => {
    const saved = localStorage.getItem('preferences');
    return saved ? JSON.parse(saved) : null;
  });

  const [workoutDays, setWorkoutDays] = useState<WorkoutDay[]>(() => {
    const saved = localStorage.getItem('workoutDays');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (preferences) {
      localStorage.setItem('preferences', JSON.stringify(preferences));
    }
  }, [preferences]);

  useEffect(() => {
    localStorage.setItem('workoutDays', JSON.stringify(workoutDays));
  }, [workoutDays]);

  const handleSetupComplete = (startDate: string, daysPerWeek: number) => {
    setPreferences({ startDate, daysPerWeek });
  };

  const handlePreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleSaveWorkout = (attended: boolean, notes: string) => {
    if (!selectedDate) return;

    const dateStr = selectedDate.toISOString().split('T')[0];
    const existingIndex = workoutDays.findIndex(day => day.date === dateStr);

    if (existingIndex >= 0) {
      const newWorkoutDays = [...workoutDays];
      newWorkoutDays[existingIndex] = { date: dateStr, attended, workoutNotes: notes };
      setWorkoutDays(newWorkoutDays);
    } else {
      setWorkoutDays([...workoutDays, { date: dateStr, attended, workoutNotes: notes }]);
    }
  };

  if (!preferences) {
    return <Setup onComplete={handleSetupComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 p-1.5 rounded">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">Queimada Diária</h1>
          </div>
        </div>

        <div className="space-y-6">
          <Dashboard 
            workoutDays={workoutDays}
            daysPerWeek={preferences.daysPerWeek}
            startDate={preferences.startDate}
          />

          <div className="bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4">
              <button
                onClick={handlePreviousMonth}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={handleNextMonth}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <Calendar
              workoutDays={workoutDays}
              currentMonth={currentMonth}
              onDayClick={handleDayClick}
              startDate={preferences.startDate}
            />
          </div>
        </div>

        {selectedDate && (
          <WorkoutModal
            date={selectedDate}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveWorkout}
            initialAttended={workoutDays.find(
              day => day.date === selectedDate.toISOString().split('T')[0]
            )?.attended}
            initialNotes={workoutDays.find(
              day => day.date === selectedDate.toISOString().split('T')[0]
            )?.workoutNotes}
          />
        )}
      </div>
    </div>
  );
}

export default App;