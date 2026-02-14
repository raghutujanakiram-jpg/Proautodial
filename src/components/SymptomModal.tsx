import React from 'react';
import { X, Activity, AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';

interface SymptomModalProps {
  isOpen: boolean;
  onClose: () => void;
  symptoms: string;
}

export function SymptomModal({ isOpen, onClose, symptoms }: SymptomModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden animate-fade-in-up">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="flex items-center gap-2 text-teal-700">
            <Activity className="w-6 h-6" />
            <h3 className="font-bold text-lg">AI Health Assessment</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <p className="text-slate-600">
            Based on your reported symptoms: <span className="font-medium text-slate-900">"{symptoms}"</span>
          </p>
          
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-amber-800 text-sm">Preliminary Assessment</h4>
              <p className="text-sm text-amber-700 mt-1">
                Potential indicators of a viral infection. Monitor temperature and hydration.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-slate-900">Recommended Specialists:</h4>
            <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:border-teal-300 cursor-pointer transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                  Dr
                </div>
                <div>
                  <p className="font-medium text-slate-900">Dr. Sarah Wilson</p>
                  <p className="text-xs text-slate-500">General Physician • 4.9 ★</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600" />
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button onClick={onClose}>Book Consultation</Button>
        </div>
      </div>
    </div>
  );
}