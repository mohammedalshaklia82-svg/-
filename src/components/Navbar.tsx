import React from 'react';
import { 
  BookOpen, Download, Palette, Layers, Award, Printer, Sparkles, 
  School, Check, FileDown, ToggleLeft, ToggleRight, Info, Eye,
  BookMarked, BookCopy, FileCheck
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'books' | 'reader' | 'downloads' | 'design' | 'scope' | 'qa';
  setActiveTab: (tab: 'books' | 'reader' | 'downloads' | 'design' | 'scope' | 'qa') => void;
  selectedGrade: 7 | 8;
  setSelectedGrade: (grade: 7 | 8) => void;
  onPrint: () => void;
  isPrintFriendly: boolean;
  setIsPrintFriendly: (enabled: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedGrade,
  setSelectedGrade,
  onPrint,
  isPrintFriendly,
  setIsPrintFriendly
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#0A2540] text-white shadow-xl border-b-2 border-[#D97706] no-print">
      {/* Top Banner: Official School & Ministry Identity */}
      <div className="bg-[#061727] text-xs py-1.5 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#D97706]/20 text-[#F59E0B] font-bold border border-[#D97706]/40 text-[11px]">
              <Sparkles className="w-3 h-3" />
              العام الدراسي 2027–2028
            </span>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <span className="text-slate-200 font-semibold text-[11px]">
              الجمهورية اليمنية • محافظة شبوة • مديرية حبان • وادي هدى
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-300 text-[11px]">
            <span className="bg-[#0891B2]/20 text-[#38BDF8] px-2 py-0.5 rounded border border-[#0891B2]/40 font-mono font-medium">
              CEFR Level: A1+ → A2 Bridge
            </span>
            <span className="hidden md:inline font-mono text-emerald-400">
              ✓ تم التدقيق والاعتماد الشامل
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand & Crest */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('books')}>
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0891B2] via-[#0A2540] to-[#D97706] p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-[#0A2540] rounded-[10px] flex items-center justify-center">
              <School className="w-6 h-6 text-[#F59E0B]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold font-arabic tracking-tight text-white leading-tight">
                مدرسة قفلة الأساسية
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-[#D97706] text-white rounded">
                منطقة هدى
              </span>
            </div>
            <p className="text-xs text-cyan-200 font-english font-medium flex items-center gap-1">
              <span>QAFLAH BASIC EDUCATION SCHOOL</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-300">English Curriculum Studio</span>
            </p>
          </div>
        </div>

        {/* Grade Quick Switcher */}
        <div className="hidden lg:flex items-center bg-white/10 p-1 rounded-xl border border-white/15">
          <button
            onClick={() => setSelectedGrade(7)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedGrade === 7
                ? 'bg-[#0891B2] text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>الصف السابع</span>
            <span className="text-[10px] opacity-75 font-english">Grade 7</span>
          </button>
          <button
            onClick={() => setSelectedGrade(8)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedGrade === 8
                ? 'bg-[#D97706] text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>الصف الثامن</span>
            <span className="text-[10px] opacity-75 font-english">Grade 8</span>
          </button>
        </div>

        {/* Action Controls: Print-Friendly Toggle + Direct Downloads */}
        <div className="flex items-center gap-2">
          
          {/* Quick Download Grade 7 Student Book */}
          <a
            href="/downloads/Qaflah_Grade7_Student_Book_HADA_REDESIGNED.pdf"
            download
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0891B2]/20 hover:bg-[#0891B2]/40 text-cyan-200 border border-cyan-400/30 rounded-xl text-xs font-bold transition"
            title="تنزيل كتاب الطالب الصف السابع كاملاً مع الغلاف (PDF 94 صفحة)"
          >
            <Download className="w-3.5 h-3.5 text-cyan-300" />
            <span>كتاب سابع PDF</span>
          </a>

          {/* Quick Download Grade 8 Student Book */}
          <a
            href="/downloads/Qaflah_Grade8_Student_Book_HADA_REDESIGNED.pdf"
            download
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/40 text-amber-200 border border-amber-400/30 rounded-xl text-xs font-bold transition"
            title="تنزيل كتاب الطالب الصف الثامن كاملاً مع الغلاف (PDF 94 صفحة)"
          >
            <Download className="w-3.5 h-3.5 text-amber-300" />
            <span>كتاب ثامن PDF</span>
          </a>

          {/* Print-Friendly Mode Toggle Button */}
          <button
            onClick={() => {
              setIsPrintFriendly(!isPrintFriendly);
              if (activeTab !== 'reader') {
                setActiveTab('reader');
              }
            }}
            title={isPrintFriendly ? 'إلغاء وضع الطباعة والعودة للعرض التفاعلي الكامل' : 'تفعيل وضع الطباعة النقي بخلفية بيضاء وعمود واحد لتصدير PDF عالي الجودة'}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border shadow-sm ${
              isPrintFriendly
                ? 'bg-emerald-500 text-white border-emerald-400 ring-2 ring-emerald-300/50 shadow-emerald-900/40'
                : 'bg-white/10 hover:bg-white/20 text-slate-200 border-white/20'
            }`}
          >
            {isPrintFriendly ? (
              <ToggleRight className="w-4 h-4 text-white" />
            ) : (
              <ToggleLeft className="w-4 h-4 text-slate-400" />
            )}
            <div className="flex flex-col text-right leading-none">
              <span className="flex items-center gap-1">
                <span>وضع الطباعة PDF</span>
                {isPrintFriendly && (
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                )}
              </span>
              <span className="text-[9px] opacity-75 font-normal">
                {isPrintFriendly ? 'نشط (خلفية بيضاء)' : 'تنسيق المعلم A4'}
              </span>
            </div>
          </button>

          {/* Direct Print Button */}
          <button
            onClick={onPrint}
            title="فتح نافذة الطباعة لتصدير الدرس كملف PDF"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0891B2] hover:bg-[#0e7490] text-white rounded-xl text-xs font-bold shadow-md transition-all active:scale-95 border border-cyan-400/40"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">طباعة A4</span>
          </button>

          {/* Master Package ZIP Button */}
          <a
            href="/downloads/Qaflah_Hada_Region_Redesigned_Package_2027_2028.zip"
            download
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-[#D97706] to-[#F59E0B] hover:brightness-110 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-900/40 transition-transform active:scale-95 border border-amber-400/40"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">تحميل الحقيبة الكاملة</span>
            <span className="md:hidden">ZIP</span>
            <span className="text-[10px] bg-black/20 px-1 py-0.2 rounded font-mono">10MB</span>
          </a>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="bg-[#0c2e4f] border-t border-white/10 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto scrollbar-none py-1 gap-1">
          <div className="flex items-center gap-1 min-w-max">
            
            {/* New Books & Covers Showcase Tab */}
            <button
              onClick={() => setActiveTab('books')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'books'
                  ? 'bg-white text-[#0A2540] shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <BookMarked className="w-4 h-4 text-amber-500" />
              <span>الكتب الأربعة والأغلفة المعتمدة</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-amber-500/20 text-amber-300 rounded font-bold font-mono">
                4 كتب + أغلفة
              </span>
            </button>

            {/* Textbook Reader Tab */}
            <button
              onClick={() => setActiveTab('reader')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'reader'
                  ? 'bg-white text-[#0A2540] shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#0891B2]" />
              <span>تصفح الدروس صفحة بصفحة</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-[#0891B2]/20 text-[#0891B2] rounded font-mono">
                90 درساً
              </span>
            </button>

            {/* Deliverables Center Tab */}
            <button
              onClick={() => setActiveTab('downloads')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'downloads'
                  ? 'bg-white text-[#0A2540] shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Download className="w-4 h-4 text-[#D97706]" />
              <span>مركز تحميل ملفات Word و PDF</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-amber-500/20 text-amber-300 rounded font-mono">
                15 ملفاً
              </span>
            </button>

            {/* Design System Tab */}
            <button
              onClick={() => setActiveTab('design')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'design'
                  ? 'bg-white text-[#0A2540] shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Palette className="w-4 h-4 text-cyan-400" />
              <span>نظام التصميم العالمي والهوية</span>
            </button>

            {/* Scope and Sequence Tab */}
            <button
              onClick={() => setActiveTab('scope')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'scope'
                  ? 'bg-white text-[#0A2540] shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>مصفوفة الوحدات والمخرجات</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 rounded font-mono">
                15 وحدة
              </span>
            </button>

            {/* QA Audit Tab */}
            <button
              onClick={() => setActiveTab('qa')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'qa'
                  ? 'bg-white text-[#0A2540] shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Award className="w-4 h-4 text-yellow-400" />
              <span>تقرير مطابقة معايير الجودة</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-emerald-500/30 text-emerald-300 rounded font-bold">
                100% مكتمل
              </span>
            </button>
          </div>

          {/* Mobile Grade Switcher */}
          <div className="flex lg:hidden items-center gap-1 border-r border-white/20 pr-2 mr-2">
            <button
              onClick={() => setSelectedGrade(7)}
              className={`px-2.5 py-1 rounded text-xs font-bold ${
                selectedGrade === 7 ? 'bg-[#0891B2] text-white' : 'text-slate-400'
              }`}
            >
              سابع
            </button>
            <button
              onClick={() => setSelectedGrade(8)}
              className={`px-2.5 py-1 rounded text-xs font-bold ${
                selectedGrade === 8 ? 'bg-[#D97706] text-white' : 'text-slate-400'
              }`}
            >
              ثامن
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
