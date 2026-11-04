import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { BooksLibrary } from './components/BooksLibrary';
import { TextbookReader } from './components/TextbookReader';
import { DownloadCenter } from './components/DownloadCenter';
import { DesignSystemView } from './components/DesignSystemView';
import { ScopeSequenceView } from './components/ScopeSequenceView';
import { QAAuditView } from './components/QAAuditView';
import { PDFDesignerStudio } from './components/PDFDesignerStudio';

import grade7Data from './data/grade7_curriculum.json';
import grade8Data from './data/grade8_curriculum.json';
import { CurriculumData } from './types/curriculum';
import { Printer, CheckCircle, Info, X, Sparkles, FileDown } from 'lucide-react';

export default function App() {
  const [selectedGrade, setSelectedGrade] = useState<7 | 8>(7);
  const [activeTab, setActiveTab] = useState<'books' | 'reader' | 'studio' | 'downloads' | 'design' | 'scope' | 'qa'>('books');
  const [currentLessonNum, setCurrentLessonNum] = useState<number>(1);
  const [isPrintFriendly, setIsPrintFriendly] = useState<boolean>(false);

  // Cast datasets
  const g7 = grade7Data as unknown as CurriculumData;
  const g8 = grade8Data as unknown as CurriculumData;

  const currentCurriculum = selectedGrade === 7 ? g7 : g8;

  const handleSelectLesson = (num: number) => {
    setCurrentLessonNum(num);
    setActiveTab('reader');
    window.scrollTo({ top: 110, behavior: 'smooth' });
  };

  const handleOpenBook = (grade: 7 | 8, mode: 'student' | 'teacher', lessonNum: number = 1) => {
    setSelectedGrade(grade);
    setCurrentLessonNum(lessonNum);
    setActiveTab('reader');
    window.scrollTo({ top: 110, behavior: 'smooth' });
  };

  const handleSelectUnitLessons = (unitNum: number) => {
    // Find first lesson of this unit
    const u = currentCurriculum.units.find(item => item.unit_number === unitNum);
    if (u) {
      const match = u.lessons_range.match(/\d+/);
      if (match) {
        setCurrentLessonNum(parseInt(match[0], 10));
      }
    }
    setActiveTab('reader');
    window.scrollTo({ top: 110, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className={`min-h-screen flex flex-col font-arabic text-slate-900 selection:bg-[#0891B2] selection:text-white transition-colors ${
        isPrintFriendly ? 'print-friendly-mode bg-white' : 'bg-[#F8FAFC]'
      }`} 
      dir="rtl"
    >
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedGrade={selectedGrade}
        setSelectedGrade={(g) => {
          setSelectedGrade(g);
          // Keep current lesson in valid range (1..90)
          setCurrentLessonNum(Math.min(90, Math.max(1, currentLessonNum)));
        }}
        onPrint={handlePrint}
        isPrintFriendly={isPrintFriendly}
        setIsPrintFriendly={setIsPrintFriendly}
      />

      {/* Teacher Print-Friendly Mode Notification Banner (Visible on-screen, hidden in print) */}
      {isPrintFriendly && (
        <aside aria-label="شريط وضع الطباعة والتصدير" className="bg-emerald-600 text-white px-4 py-3 shadow-md no-print border-b border-emerald-700 animate-fadeIn">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 rounded-lg bg-emerald-700/80 text-white">
                <Printer className="w-4 h-4" />
              </span>
              <div>
                <p className="font-bold text-sm text-white flex items-center gap-2">
                  <span>وضع الطباعة والتصدير مفعّل (Teacher Print Layout Active)</span>
                  <span className="text-[10px] bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded font-mono">
                    Single-Column A4 Format
                  </span>
                </p>
                <p className="text-emerald-100 text-[11px] mt-0.5">
                  تم تحويل الصفحة تلقائياً إلى خلفية بيضاء نقية وتخطيط عمود واحد مبسط بدون قوائم جانبية، لتحقيق أعلى جودة عند الحفظ كملف PDF أو الطباعة الورقية.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-3.5 py-1.5 bg-white text-emerald-900 hover:bg-emerald-50 rounded-lg font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition"
              >
                <FileDown className="w-3.5 h-3.5 text-emerald-700" />
                <span>فتح أمر الطباعة (Ctrl+P)</span>
              </button>

              <button
                onClick={() => setIsPrintFriendly(false)}
                className="px-2.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-semibold flex items-center gap-1 transition"
                title="إلغاء وضع الطباعة"
              >
                <X className="w-3.5 h-3.5" />
                <span>إغلاق</span>
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Main Body per Tab */}
      <main className="flex-1">
        {activeTab === 'books' && (
          <BooksLibrary
            onOpenBook={handleOpenBook}
            onPrint={handlePrint}
          />
        )}

        {activeTab === 'reader' && (
          <TextbookReader
            grade={selectedGrade}
            lessons={currentCurriculum.lessons}
            units={currentCurriculum.units}
            currentLessonNum={currentLessonNum}
            onSelectLesson={setCurrentLessonNum}
            onPrintLesson={handlePrint}
            isPrintFriendly={isPrintFriendly}
            setIsPrintFriendly={setIsPrintFriendly}
          />
        )}

        {activeTab === 'studio' && (
          <PDFDesignerStudio
            grade={selectedGrade}
            lessons={currentCurriculum.lessons}
            units={currentCurriculum.units}
            currentLessonNum={currentLessonNum}
            onSelectLesson={setCurrentLessonNum}
            onSwitchGrade={setSelectedGrade}
            onPrint={handlePrint}
          />
        )}

        {activeTab === 'downloads' && (
          <DownloadCenter />
        )}

        {activeTab === 'design' && (
          <DesignSystemView />
        )}

        {activeTab === 'scope' && (
          <ScopeSequenceView
            grade={selectedGrade}
            units={currentCurriculum.units}
            onSelectUnitLessons={handleSelectUnitLessons}
            onSwitchGrade={setSelectedGrade}
          />
        )}

        {activeTab === 'qa' && (
          <QAAuditView
            onGoToDownloads={() => {
              setActiveTab('downloads');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToReader={() => {
              setActiveTab('reader');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Official Footer (Hidden in Print) */}
      <footer className="bg-[#061727] text-white border-t-2 border-[#D97706] py-10 px-4 no-print">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: School Identity */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#D97706] flex items-center justify-center font-bold text-white text-xs">
                QS
              </div>
              <h4 className="font-bold text-base font-arabic text-white">
                مدرسة قفلة الأساسية — وادي هدى — حبان — شبوة
              </h4>
            </div>
            <p className="text-xs text-slate-400 font-arabic leading-relaxed max-w-lg">
              مشروع إعادة تصميم وإخراج المناهج التعليمية للغة الإنجليزية للصفين السابع والثامن (كتاب الطالب ودليل المعلم) وفق معايير النشر الدولي الحديثة (A1+ → A2 Bridge) للعام الدراسي 2027–2028 م.
            </p>
            <div className="text-[11px] text-cyan-300 font-english font-medium">
              Hada Region, Habban, Shabwah Governorate, Republic of Yemen
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold font-arabic text-amber-400 uppercase tracking-wider">
              أقسام المنصة والكتب
            </h5>
            <ul className="space-y-1.5 text-xs text-slate-300 font-arabic">
              <li>
                <button onClick={() => setActiveTab('books')} className="hover:text-cyan-300 transition">
                  الكتب الأربعة الكاملة مع الأغلفة (معاينة وتحميل)
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('reader'); setSelectedGrade(7); }} className="hover:text-cyan-300 transition">
                  تصفح كتاب الصف السابع (الدروس 1–90)
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('reader'); setSelectedGrade(8); }} className="hover:text-cyan-300 transition">
                  تصفح كتاب الصف الثامن (الدروس 1–90)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('studio')} className="hover:text-cyan-300 transition text-amber-300 font-bold">
                  استوديو تنسيق وتوليد صفحات PDF المعتمدة (A4)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('downloads')} className="hover:text-cyan-300 transition">
                  مركز تحميل ملفات Word و PDF (15 ملفاً)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('design')} className="hover:text-cyan-300 transition">
                  الهوية البصرية ونظام التصميم
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('qa')} className="hover:text-cyan-300 transition">
                  تقرير مطابقة الجودة والاعتماد
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Technical Specifications */}
          <div className="space-y-2 text-xs font-arabic text-slate-400">
            <h5 className="text-xs font-bold font-arabic text-amber-400 uppercase tracking-wider">
              مواصفات التسليم
            </h5>
            <p>• المقاس: A4 Portrait قياسي للطباعة</p>
            <p>• إجمالي الصفحات: 327 صفحة PDF معتمدة</p>
            <p>• التوزيع: متوازن من أعلى لأسفل (Zero Gaps)</p>
            <p>• الرسوم: مرتبطة بالدروس والشخصيات</p>
            <p>• الحزمة: ملف ZIP شامل 10.13 MB</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 font-arabic">
          <p>© 2027–2028 مدرسة قفلة الأساسية. جميع الحقوق محفوظة لدار النشر التعليمي.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>مبني بالمعايير العالمية الحديثة (Modern International Educational Textbook Standards)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
