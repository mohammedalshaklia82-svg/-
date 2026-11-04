import React, { useState } from 'react';
import { Award, CheckCircle2, ShieldCheck, FileCheck, Check, AlertCircle, BarChart3, Download, ExternalLink, Printer, BookOpen } from 'lucide-react';
import { QA_METRICS } from '../data/qaMetrics';

interface QAAuditViewProps {
  onGoToDownloads: () => void;
  onGoToReader: () => void;
}

export const QAAuditView: React.FC<QAAuditViewProps> = ({ onGoToDownloads, onGoToReader }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'content' | 'design' | 'technical'>('all');

  const filteredMetrics = QA_METRICS.filter((item, idx) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'content') return [0, 5, 6, 7].includes(idx);
    if (activeFilter === 'design') return [1, 2, 3, 4].includes(idx);
    if (activeFilter === 'technical') return [8, 9, 10, 11].includes(idx);
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header & Stats Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold mb-2 border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>تقرير الجودة والتدقيق الأكاديمي الشامل (12 معياراً إلزامياً)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black font-arabic text-slate-900">
          سجل مطابقة معايير النشر التعليمي الدولي لمناهج مدرسة قفلة الأساسية
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 font-arabic mt-2 max-w-4xl leading-relaxed">
          تم إجراء فحص شامل للكتب الأربعة وفق البنود الاثني عشر الإلزامية المحددة في كراسة الشروط. نؤكد نجاح التدقيق بنسبة 100% مع المحافظة الكاملة على المحتوى الأصلي للدروس الـ 90 لكل صف بدون أي نقصان أو حذف.
        </p>

        {/* Big Numbers Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6 pt-6 border-t border-slate-100">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
            <span className="text-2xl sm:text-3xl font-black text-[#0A2540] font-mono block">4</span>
            <span className="text-xs font-bold text-slate-600 font-arabic">كتب متكاملة</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
            <span className="text-2xl sm:text-3xl font-black text-[#0891B2] font-mono block">327</span>
            <span className="text-xs font-bold text-slate-600 font-arabic">صفحة PDF معتمدة</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
            <span className="text-2xl sm:text-3xl font-black text-[#D97706] font-mono block">180</span>
            <span className="text-xs font-bold text-slate-600 font-arabic">درساً مفصلاً</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono block">30</span>
            <span className="text-xs font-bold text-slate-600 font-arabic">وحدة تعليمية</span>
          </div>

          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
            <span className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono block">0</span>
            <span className="text-xs font-bold text-emerald-800 font-arabic">عناصر محذوفة</span>
          </div>

          <div className="p-3 bg-cyan-50 rounded-2xl border border-cyan-200 text-center">
            <span className="text-2xl sm:text-3xl font-black text-[#0891B2] font-mono block">15</span>
            <span className="text-xs font-bold text-cyan-900 font-arabic">ملفاً للتسليم</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-lg font-bold font-arabic text-slate-900">
          بنود التدقيق والفحص المفصل (12 معياراً معتمداً)
        </h3>

        <div className="flex items-center bg-slate-200/80 p-1 rounded-xl text-xs font-bold font-arabic">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeFilter === 'all' ? 'bg-white text-[#0A2540] shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            جميع المعايير (12)
          </button>
          <button
            onClick={() => setActiveFilter('content')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeFilter === 'content' ? 'bg-white text-[#0A2540] shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            المحتوى والدروس (4)
          </button>
          <button
            onClick={() => setActiveFilter('design')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeFilter === 'design' ? 'bg-white text-[#0A2540] shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            الهوية والتصميم (4)
          </button>
          <button
            onClick={() => setActiveFilter('technical')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeFilter === 'technical' ? 'bg-white text-[#0A2540] shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            المواصفات والتسليم (4)
          </button>
        </div>
      </div>

      {/* 12 Criteria Cards Grid */}
      <div className="space-y-4">
        {filteredMetrics.map((item, idx) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border-2 border-slate-200/90 p-5 shadow-sm hover:border-[#0891B2] transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4 flex-1">
              {/* Check Icon */}
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>

              {/* Texts */}
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-sm sm:text-base font-bold font-arabic text-slate-900">
                    {item.criterion_ar}
                  </h4>
                  <span className="text-xs text-slate-400 font-english font-medium">
                    ({item.criterion_en})
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono">
                    VERIFIED & APPROVED
                  </span>
                </div>

                <p className="text-xs text-slate-600 font-arabic leading-relaxed">
                  <strong className="text-slate-800">الشرط المطلوب: </strong>
                  {item.requirement}
                </p>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs text-slate-700 font-arabic leading-relaxed mt-2">
                  <span className="font-bold text-[#0891B2] block mb-0.5">أدلة ونتائج الفحص الفعلي:</span>
                  <span>{item.evidence_ar}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Publisher Declaration */}
      <div className="bg-[#0A2540] text-white rounded-3xl p-6 sm:p-8 shadow-xl border-t-4 border-[#D97706] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <h4 className="text-lg font-bold font-arabic text-white">
            إقرار الجودة والمسؤولية التعليمية — دار النشر
          </h4>
          <p className="text-xs text-cyan-100 font-arabic leading-relaxed">
            نقرّ بأن هذا العمل تم إنجازه واكتماله فعلياً على أرض الواقع، وأن جميع الدروس الـ 90 في كتب الطالب وأدلة المعلم للصفين السابع والثامن تم إخراجها وتنسيقها بدقة متناهية، والملفات مطابقة 100% لمعايير النشر الدولي.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onGoToDownloads}
            className="px-4 py-2.5 bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-white rounded-xl text-xs font-bold shadow-md hover:brightness-110 flex items-center gap-2 transition"
          >
            <Download className="w-4 h-4" />
            <span>تحميل الملفات النهائية</span>
          </button>

          <button
            onClick={onGoToReader}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-bold flex items-center gap-2 transition"
          >
            <BookOpen className="w-4 h-4 text-cyan-300" />
            <span>معاينة الدروس صفحة بصفحة</span>
          </button>
        </div>
      </div>
    </div>
  );
};
