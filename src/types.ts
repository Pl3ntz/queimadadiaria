export interface WorkoutDay {
  date: string;
  attended: boolean;
  workoutNotes?: string;
}

export interface UserPreferences {
  startDate: string;
  daysPerWeek: number;
}