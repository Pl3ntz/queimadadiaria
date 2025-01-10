import React, { useState } from 'react';
import { Flame } from 'lucide-react';

interface SetupProps {
  onComplete: (startDate: string, daysPerWeek: number) => void;
}

export function Setup({ onComplete }: SetupProps) {
  const [startDate, setStartDate] = useState('');
  const [daysPerWeek, setDaysPerWeek] = useState(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(startDate, daysPerWeek);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-6 w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-orange-500 p-3 rounded-full mb-3">
            <Flame className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Queimada Diária</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data de início
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dias de treino por semana
            </label>
            <select
              value={daysPerWeek}
              onChange={(e) => setDaysPerWeek(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
            >
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'dia' : 'dias'}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium text-sm"
          >
            Começar
          </button>
        </form>
      </div>
    </div>
  );
}