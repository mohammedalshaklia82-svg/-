import React, { useState } from 'react';
import { Palette, Layers, Check, Copy, Sparkles, BookOpen, UserCheck, MessageSquare, LayoutGrid, Printer, Shield } from 'lucide-react';
import { COLOR_PALETTE, DESIGN_PRINCIPLES, SCHOOL_IDENTITY } from '../data/designSystem';

export const DesignSystemView: React.FC = () => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D97706]/10 text-[#D97706] rounded-full text-xs font-bold mb-2">
          <Palette className="w-3.5 h-3.5" />
          <span>نظام التصميم العالمي والهوية البصرية (Design Constitution)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black font-arabic text-slate-900">
          الهوية البصرية ومعايير إخراج المناهج الحديثة لمدرسة قفلة الأساسية
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 font-arabic mt-2 leading-relaxed max-w-4xl">
          التزام صارم بهوية الأغلفة المعتمدة الصادرة عن دور النشر التعليمية العالمية (مثل Oxford و Cambridge)، بالجمع بين الأزرق البحري الداكن، الأزرق الفيروزي، والأصفر الذهبي، مع التوزيع المتوازن للمحتوى من أعلى الصفحة إلى أسفلها لمنع الفراغات المتروكة.
        </p>
      </div>

      {/* 1. Official Color Palette */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2.5 h-6 bg-[#0891B2] rounded-full" />
          <h3 className="text-lg font-bold font-arabic text-slate-900">
            أولاً: لوحة الألوان المعتمدة المشتقة من الأغلفة الأصلية
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {COLOR_PALETTE.map(color => (
            <div
              key={color.hex}
              className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Color Swatch */}
                <div 
                  className="h-28 w-full flex items-end justify-between p-3"
                  style={{ backgroundColor: color.hex }}
                >
                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold shadow-sm ${
                    color.hex === '#FFFFFF' || color.hex === '#E0F2FE' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
                  }`}>
                    {color.hex}
                  </span>
                  <button
                    onClick={() => handleCopy(color.hex)}
                    className="p-1.5 rounded-lg bg-black/20 hover:bg-black/40 text-white transition"
                    title="نسخ كود اللون"
                  >
                    {copiedHex === color.hex ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="p-4">
                  <h4 className="font-bold text-sm text-slate-900 font-arabic">
                    {color.name_ar}
                  </h4>
                  <p className="text-[11px] font-english text-slate-500 font-medium">
                    {color.name_en}
                  </p>
                  <p className="text-xs text-slate-600 font-arabic mt-2 leading-relaxed">
                    {color.role_ar}
                  </p>
                </div>
              </div>

              <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 text-[10px] font-english text-slate-500">
                {color.role_en}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Page Reconstruction & Vertical Balance Comparison */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2.5 h-6 bg-[#D97706] rounded-full" />
          <h3 className="text-lg font-bold font-arabic text-slate-900">
            ثانياً: معالجة مشكلة الفراغات وتركز المحتوى (Vertical Equilibrium)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Old Issue */}
          <div className="p-5 bg-rose-50/60 rounded-2xl border-2 border-rose-200">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-xs mb-3">
              <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[11px]">✕</span>
              <span>المشكلة السابقة في النسخة التقليدية:</span>
            </div>
            <div className="h-56 bg-white rounded-xl border border-rose-300 p-3 flex flex-col justify-between shadow-inner">
              <div className="space-y-1.5 opacity-70">
                <div className="h-4 bg-slate-300 rounded w-1/2" />
                <div className="h-3 bg-slate-200 rounded w-3/4" />
                <div className="h-3 bg-slate-200 rounded w-2/3" />
                <div className="h-8 bg-slate-100 rounded border border-dashed border-slate-300" />
              </div>
              <div className="h-28 bg-rose-50 rounded-lg border-2 border-dashed border-rose-300 flex items-center justify-center text-rose-600 text-xs font-bold text-center px-4">
                النصف السفلي من الصفحة كان يترك فارغاً تماماً ومهملاً، مما يسبب هدراً للورق وضعفاً بصرياً!
              </div>
            </div>
          </div>

          {/* New Reconstructed Design */}
          <div className="p-5 bg-emerald-50/60 rounded-2xl border-2 border-emerald-200">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs mb-3">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px]">✓</span>
              <span>الحل المعتمد في التصميم الجديد (4 بطاقات متوازنة):</span>
            </div>
            <div className="h-56 bg-white rounded-xl border-2 border-[#0A2540] p-3 flex flex-col justify-between shadow-md">
              <div className="h-6 bg-[#0A2540] text-white rounded text-[10px] font-bold flex items-center justify-between px-2">
                <span>Unit Header & Title</span>
                <span className="text-amber-300">A4 Page</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <div className="h-10 bg-cyan-50 border border-cyan-200 rounded text-[9px] font-bold text-cyan-800 flex items-center justify-center">
                  1. Look, listen & say (Vocab)
                </div>
                <div className="h-10 bg-amber-50 border border-amber-200 rounded text-[9px] font-bold text-amber-800 flex items-center justify-center">
                  2. Model / Grammar Focus
                </div>
              </div>
              <div className="h-12 bg-slate-50 border border-slate-200 rounded text-[9px] font-bold text-slate-800 flex items-center justify-center">
                3. Practise Tasks (Interactive exercises)
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <div className="h-8 bg-teal-50 border border-teal-200 rounded text-[9px] font-bold text-teal-800 flex items-center justify-center">
                  4. Use English
                </div>
                <div className="h-8 bg-emerald-50 border border-emerald-200 rounded text-[9px] font-bold text-emerald-800 flex items-center justify-center">
                  5. Self-Check Box
                </div>
              </div>
              <div className="h-3 bg-slate-100 rounded text-[8px] text-slate-500 flex items-center justify-center font-mono">
                Qaflah Basic Education School • Academic Year 2027–2028
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Design Principles Grid */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2.5 h-6 bg-[#0A2540] rounded-full" />
          <h3 className="text-lg font-bold font-arabic text-slate-900">
            ثالثاً: معايير ومبادئ الإخراج الأكاديمي الدولي المطبقة
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {DESIGN_PRINCIPLES.map((principle, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border-2 border-slate-200 p-5 shadow-sm hover:border-[#0891B2] transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#0A2540] text-yellow-400 flex items-center justify-center font-bold text-sm mb-3 shadow-sm">
                0{idx + 1}
              </div>
              <h4 className="text-sm font-bold font-arabic text-slate-900">
                {principle.title_ar}
              </h4>
              <p className="text-[11px] font-english text-slate-500 font-semibold mt-0.5">
                {principle.title_en}
              </p>
              <p className="text-xs text-slate-600 font-arabic mt-2.5 leading-relaxed">
                {principle.desc_ar}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. School Identity Reference */}
      <div className="bg-gradient-to-r from-slate-900 to-[#0A2540] text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs font-bold border border-yellow-500/30">
            <Shield className="w-3.5 h-3.5" />
            <span>بيانات الهوية الرسمية لمدرسة قفلة الأساسية</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold font-arabic">
            {SCHOOL_IDENTITY.name_ar} — {SCHOOL_IDENTITY.name_en}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-arabic pt-2 text-slate-300">
            <div>
              <span className="text-slate-400 block mb-0.5">النطاق الجغرافي والإداري:</span>
              <span className="text-white font-semibold">{SCHOOL_IDENTITY.region_ar}</span>
              <span className="text-cyan-300 font-english block mt-0.5">{SCHOOL_IDENTITY.region_en}</span>
            </div>

            <div>
              <span className="text-slate-400 block mb-0.5">العام الدراسي والمستوى:</span>
              <span className="text-white font-semibold">العام الدراسي 2027–2028 م</span>
              <span className="text-amber-300 font-english block mt-0.5">CEFR Target: A1+ → A2 Bridge Series</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
