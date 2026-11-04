import React from 'react';
import { Layers, BookOpen, CheckCircle, ArrowLeft, Sparkles, Compass, Clock, Award } from 'lucide-react';
import { Unit } from '../types/curriculum';

interface ScopeSequenceViewProps {
  grade: 7 | 8;
  units: Unit[];
  onSelectUnitLessons: (unitNum: number) => void;
  onSwitchGrade: (grade: 7 | 8) => void;
}

export const ScopeSequenceView: React.FC<ScopeSequenceViewProps> = ({
  grade,
  units,
  onSelectUnitLessons,
  onSwitchGrade
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0891B2]/10 text-[#0891B2] rounded-full text-xs font-bold mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>مصفوفة المدى والتتابع (Scope and Sequence)</span>
          </div>
          <h2 className="text-2xl font-black font-arabic text-slate-900">
            خطة الوحدات والموضوعات — الصف {grade === 7 ? 'السابع' : 'الثامن'} الأساسي
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-arabic mt-1">
            مدرسة قفلة الأساسية • العام الدراسي 2027–2028 • المستوى المستهدف: A1+ → A2 Bridge (90 درساً مقسمة على 15 وحدة)
          </p>
        </div>

        {/* Grade Toggle Button */}
        <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => onSwitchGrade(7)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              grade === 7 ? 'bg-[#0891B2] text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            الصف السابع (15 وحدة)
          </button>
          <button
            onClick={() => onSwitchGrade(8)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              grade === 8 ? 'bg-[#D97706] text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            الصف الثامن (15 وحدة)
          </button>
        </div>
      </div>

      {/* 15 Units Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {units.map((unit, idx) => {
          // Color accents cycling
          const colors = [
            'border-teal-500/40 bg-teal-50/20 text-teal-700',
            'border-cyan-500/40 bg-cyan-50/20 text-cyan-700',
            'border-blue-500/40 bg-blue-50/20 text-blue-700',
            'border-amber-500/40 bg-amber-50/20 text-amber-700',
            'border-emerald-500/40 bg-emerald-50/20 text-emerald-700',
          ];
          const colorClass = colors[idx % colors.length];

          return (
            <div
              key={unit.unit_number}
              className="bg-white rounded-2xl border-2 border-slate-200 hover:border-[#0891B2] p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Unit badge & lessons count */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-[#0A2540] text-white flex items-center justify-center font-bold text-xs shadow-sm font-mono">
                      U{unit.unit_number}
                    </span>
                    <span className="text-xs font-bold font-arabic text-slate-800">
                      الوحدة {unit.unit_number}
                    </span>
                  </div>

                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-mono text-xs font-bold border border-slate-200">
                    {unit.lessons_range}
                  </span>
                </div>

                {/* Topic Title */}
                <h4 className="text-sm font-bold font-english text-slate-900 group-hover:text-[#0891B2] transition-colors leading-snug">
                  {unit.topic}
                </h4>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600 font-arabic">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>توزيع زمني: 6 حصص تعليمية لكل وحدة (30 دقيقة للحصة)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>مخرجات متوافقة مع معايير A1+ → A2 Bridge</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectUnitLessons(unit.unit_number)}
                className="mt-4 w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-[#0A2540] hover:text-white text-slate-700 border border-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5 group-hover:border-[#0A2540]"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#0891B2] group-hover:text-cyan-300" />
                <span>تصفح دروس هذه الوحدة</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
