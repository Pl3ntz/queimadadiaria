import React, { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { X } from 'lucide-react';

interface WorkoutModalProps {
  date: Date;
  isOpen: boolean;
  onClose: () => void;
  onSave: (attended: boolean, notes: string) => void;
  initialAttended?: boolean;
  initialNotes?: string;
}

export function WorkoutModal({ 
  date, 
  isOpen, 
  onClose, 
  onSave,
  initialAttended = true,
  initialNotes = ''
}: WorkoutModalProps) {
  const [attended, setAttended] = useState(initialAttended);
  const [notes, setNotes] = useState(initialNotes);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-purple-800">
            {format(date, "dd 'de' MMMM", { locale: ptBR })}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Você treinou neste dia?
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => setAttended(true)}
                className={`px-4 py-2 rounded-lg ${
                  attended
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                Sim
              </button>
              <button
                onClick={() => setAttended(false)}
                className={`px-4 py-2 rounded-lg ${
                  !attended
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                Não
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Anotações do treino (opcional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={4}
              placeholder="Digite suas anotações aqui..."
            />
          </div>

          <button
            onClick={() => {
              onSave(attended, notes);
              onClose();
            }}
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}