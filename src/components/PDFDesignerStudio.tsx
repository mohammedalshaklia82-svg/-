import React, { useState } from 'react';
import { 
  Printer, Download, Sparkles, Sliders, CheckCircle, Eye, 
  FileText, Copy, BookOpen, Layers, Check, School, 
  Award, RefreshCw, Bookmark, HelpCircle, Volume2, Star,
  ClipboardList, Target, ChevronLeft, ChevronRight, Compass,
  CheckSquare, X
} from 'lucide-react';
import { Lesson, Unit } from '../types/curriculum';
import { PDFPreviewModal, PDFBookPreview } from './PDFPreviewModal';

interface PDFDesignerStudioProps {
  grade: 7 | 8;
  lessons: Lesson[];
  units: Unit[];
  currentLessonNum: number;
  onSelectLesson: (num: number) => void;
  onSwitchGrade: (grade: 7 | 8) => void;
  onPrint: () => void;
}

export const PDFDesignerStudio: React.FC<PDFDesignerStudioProps> = ({
  grade,
  lessons,
  units,
  currentLessonNum,
  onSelectLesson,
  onSwitchGrade,
  onPrint
}) => {
  // Page template view selector: Exactly matching the 4 reference pages from the user's image!
  const [activeTemplatePage, setActiveTemplatePage] = useState<'lesson' | 'practice' | 'review' | 'contents' | 'spread'>('lesson');
  const [useSampleHussamData, setUseSampleHussamData] = useState<boolean>(true);
  const [copiedToast, setCopiedToast] = useState<boolean>(false);
  const [showReferenceModal, setShowReferenceModal] = useState<boolean>(false);

  // Full PDF Preview Modal State
  const [previewBook, setPreviewBook] = useState<PDFBookPreview | null>(null);

  const currentLesson = lessons.find(l => l.lesson_number === currentLessonNum) || lessons[0];
  const currentUnit = units.find(u => u.unit_number === currentLesson?.unit_number) || units[0];

  // Arabic vocabulary translation dictionary for dynamic lessons
  const vocabTranslations: Record<string, string> = {
    'school': 'مدرسة',
    'student': 'طالب',
    'friend': 'صديق',
    'welcome': 'مرحباً',
    'teacher': 'معلم / أستاذ',
    'classroom': 'فصل دراسي',
    'book': 'كتاب',
    'pen': 'قلم',
    'hello': 'أهلاً',
    'good morning': 'صباح الخير',
    'family': 'عائلة',
    'home': 'منزل / بيت',
    'father': 'أب',
    'mother': 'أم',
    'brother': 'أخ',
    'sister': 'أخت',
    'water': 'ماء',
    'food': 'طعام',
    'market': 'سوق',
    'town': 'بلدة / قرية'
  };

  const getArabicWord = (word: string): string => {
    const clean = word.toLowerCase().trim();
    if (vocabTranslations[clean]) return vocabTranslations[clean];
    // Return appropriate educational translation hint
    return 'مفردة مستهدفة';
  };

  const handleCopyText = () => {
    const text = `
QAFLAH BASIC EDUCATION SCHOOL - ENGLISH CURRICULUM 2027-2028
Grade ${grade} | Unit ${currentLesson.unit_number}: ${currentUnit.topic}
Lesson ${currentLesson.lesson_number}: ${currentLesson.title}

[TARGET OBJECTIVE]
${currentLesson.student_book.learning_goal}

[KEY VOCABULARY]
${currentLesson.student_book.vocabulary.map(v => `${v} - ${getArabicWord(v)}`).join('\n')}

[GRAMMAR FOCUS]
${currentLesson.student_book.language_focus_title}:
${currentLesson.student_book.language_focus_content.join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2000);
  };

  const handleOpenMasterPDF = () => {
    setPreviewBook({
      title_ar: `كتاب الطالب المعتمد للصف ${grade}`,
      title_en: `Grade ${grade} Student Book`,
      grade: grade,
      mode: 'student',
      pdf_url: grade === 7 
        ? '/downloads/Qaflah_Grade7_Student_Book_HADA_REDESIGNED.pdf'
        : '/downloads/Qaflah_Grade8_Student_Book_HADA_REDESIGNED.pdf',
      cover_url: grade === 7 ? '/downloads/G7_SB_Cover.png' : '/downloads/G8_SB_Cover.png',
      pdf_pages: 94,
      pdf_size: grade === 7 ? '2.44 MB' : '2.47 MB',
      desc_ar: `النسخة المعتمدة الشاملة المخرجة وفق معايير النشر الدولية الحديثة لمدرسة قفلة الأساسية للعام الدراسي 2027–2028.`
    });
  };

  return (
    <div className="w-full bg-slate-100 min-h-screen py-8 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Studio Top Control Panel (Hidden when printing PDF) */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl border border-slate-200 no-print space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0A2E5C] to-[#0284C7] flex items-center justify-center text-white shadow-md">
                <Sliders className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#0A2E5C] text-amber-300 font-mono">
                    Official Textbook Layout
                  </span>
                  <span className="text-[11px] text-emerald-600 font-bold font-arabic flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>مطابق تماماً لنموذج النشر الدولي المعتمد</span>
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black font-arabic text-slate-900 mt-1">
                  إخراج وتصميم الصفحات الداخلية لكتب PDF المعتمدة
                </h2>
                <p className="text-xs text-slate-500 font-arabic">
                  مدرسة قفلة الأساسية – وادي هدى – حبان – شبوة • العام الدراسي 2027–2028
                </p>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={onPrint}
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة / تصدير PDF الآن (A4)</span>
              </button>

              <button
                onClick={handleOpenMasterPDF}
                className="px-4 py-2.5 bg-[#0A2E5C] hover:bg-[#133659] text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center gap-2 active:scale-95"
              >
                <BookOpen className="w-4 h-4 text-cyan-300" />
                <span>معاينة الكتاب الكامل PDF (94 صفحة)</span>
              </button>

              <button
                onClick={() => setShowReferenceModal(true)}
                className="px-3.5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
                title="عرض نموذج الصفحات الأربع المعتمدة المرفوعة كمرجع"
              >
                <Eye className="w-4 h-4 text-slate-950" />
                <span>عرض الصورة المرجعية</span>
              </button>

              <button
                onClick={handleCopyText}
                className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                title="نسخ محتوى الدرس كنص منسق"
              >
                <Copy className="w-4 h-4 text-slate-500" />
                <span>{copiedToast ? 'تم النسخ!' : 'نسخ النص'}</span>
              </button>
            </div>
          </div>

          {/* Quick Template Page Switcher - Matching the 4 reference pages */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold font-arabic text-slate-700">
              <span className="flex items-center gap-1.5">
                <Bookmark className="w-4 h-4 text-cyan-600" />
                <span>اختر الصفحة المطلوب استعراضها وتصديرها كـ PDF (وفق النموذج المعتمد):</span>
              </span>
              <span className="text-[11px] text-slate-400">
                مبني على قياس A4 الدولي
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-arabic text-xs font-bold">
              <button
                onClick={() => setActiveTemplatePage('lesson')}
                className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1 text-center ${
                  activeTemplatePage === 'lesson'
                    ? 'bg-[#0A2E5C] text-white border-[#0284C7] shadow-md ring-2 ring-cyan-400/40'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="text-amber-400 text-xs font-mono">صفحة 5</span>
                <span>1. صفحة الدرس الرئيسية</span>
                <span className="text-[10px] opacity-75 font-normal">الحوار + المفردات + القواعد</span>
              </button>

              <button
                onClick={() => setActiveTemplatePage('practice')}
                className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1 text-center ${
                  activeTemplatePage === 'practice'
                    ? 'bg-[#0A2E5C] text-white border-[#0284C7] shadow-md ring-2 ring-cyan-400/40'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="text-amber-400 text-xs font-mono">صفحة 7</span>
                <span>2. صفحة التمارين (Practice)</span>
                <span className="text-[10px] opacity-75 font-normal">تمارين A & B + بطاقة Remember</span>
              </button>

              <button
                onClick={() => setActiveTemplatePage('review')}
                className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1 text-center ${
                  activeTemplatePage === 'review'
                    ? 'bg-[#0A2E5C] text-white border-[#0284C7] shadow-md ring-2 ring-cyan-400/40'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="text-amber-400 text-xs font-mono">صفحة 10</span>
                <span>3. التقييم الذاتي والمراجعة</span>
                <span className="text-[10px] opacity-75 font-normal">المطابقة + التعبير + You Can Do It</span>
              </button>

              <button
                onClick={() => setActiveTemplatePage('contents')}
                className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1 text-center ${
                  activeTemplatePage === 'contents'
                    ? 'bg-[#0A2E5C] text-white border-[#0284C7] shadow-md ring-2 ring-cyan-400/40'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span className="text-amber-400 text-xs font-mono">صفحة 3</span>
                <span>4. فهرس الكتاب (Contents)</span>
                <span className="text-[10px] opacity-75 font-normal">جدول الوحدات الـ 15 كاملة</span>
              </button>

              <button
                onClick={() => setActiveTemplatePage('spread')}
                className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1 text-center col-span-2 sm:col-span-1 ${
                  activeTemplatePage === 'spread'
                    ? 'bg-[#D97706] text-white border-amber-400 shadow-md ring-2 ring-amber-300/40'
                    : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                }`}
              >
                <span className="text-xs font-mono">العرض الشامل</span>
                <span>معاينة الصفحات الأربع معاً</span>
                <span className="text-[10px] opacity-90 font-normal">4-Page Master Spread</span>
              </button>
            </div>
          </div>

          {/* Settings & Lesson Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 text-xs font-arabic">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700">الصف الدراسي:</span>
              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  onClick={() => onSwitchGrade(7)}
                  className={`px-3 py-1 rounded-lg font-bold transition ${
                    grade === 7 ? 'bg-[#0891B2] text-white shadow' : 'text-slate-600'
                  }`}
                >
                  الصف السابع (Grade 7)
                </button>
                <button
                  onClick={() => onSwitchGrade(8)}
                  className={`px-3 py-1 rounded-lg font-bold transition ${
                    grade === 8 ? 'bg-[#0A2E5C] text-white shadow' : 'text-slate-600'
                  }`}
                >
                  الصف الثامن (Grade 8)
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700">تطبيق التصميم على:</span>
              <button
                onClick={() => setUseSampleHussamData(true)}
                className={`px-3 py-1.5 rounded-xl border font-bold transition flex items-center gap-1.5 ${
                  useSampleHussamData
                    ? 'bg-cyan-50 text-cyan-800 border-cyan-400'
                    : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}
              >
                <Check className={`w-3.5 h-3.5 ${useSampleHussamData ? 'opacity-100' : 'opacity-0'}`} />
                <span>الدرس النموذجي المعتمد (Hussam & Ayman)</span>
              </button>

              <button
                onClick={() => setUseSampleHussamData(false)}
                className={`px-3 py-1.5 rounded-xl border font-bold transition flex items-center gap-1.5 ${
                  !useSampleHussamData
                    ? 'bg-amber-50 text-amber-800 border-amber-400'
                    : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}
              >
                <Check className={`w-3.5 h-3.5 ${!useSampleHussamData ? 'opacity-100' : 'opacity-0'}`} />
                <span>الدرس الحالي من المنهج (درس {currentLessonNum})</span>
              </button>

              {!useSampleHussamData && (
                <select
                  value={currentLessonNum}
                  onChange={(e) => onSelectLesson(Number(e.target.value))}
                  className="px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800"
                >
                  {lessons.map(l => (
                    <option key={l.lesson_number} value={l.lesson_number}>
                      درس {l.lesson_number}: {l.title}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* VIEW 1: SINGLE A4 PAGE DISPLAY (Pixel-perfect matching)       */}
        {/* ------------------------------------------------------------- */}
        {activeTemplatePage !== 'spread' && (
          <div className="flex justify-center">
            {/* PAGE 5: LESSON PRESENTATION */}
            {activeTemplatePage === 'lesson' && (
              <article 
                className="textbook-sheet bg-white w-full max-w-[780px] min-h-[1080px] shadow-2xl rounded-3xl border-2 border-slate-300 p-8 sm:p-10 font-english text-slate-900 flex flex-col justify-between relative overflow-hidden transition-all"
                dir="ltr"
              >
                <div>
                  {/* Top Header Pill: Navy Unit pill + Yellow angled Lesson badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="bg-[#0A2E5C] text-white font-extrabold text-sm sm:text-base px-6 py-2.5 rounded-l-2xl shadow-sm tracking-wide">
                        {useSampleHussamData ? 'Unit 1: About Me & My World' : `Unit ${currentLesson.unit_number}: ${currentUnit.topic}`}
                      </div>
                      <div className="bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] text-slate-950 font-black text-sm sm:text-base px-6 py-2.5 rounded-r-2xl shadow-sm tracking-wider font-mono">
                        {useSampleHussamData ? 'Lesson 1' : `Lesson ${currentLesson.lesson_number}`}
                      </div>
                    </div>
                  </div>

                  {/* Soft Cyan Title Banner */}
                  <div className="w-full bg-[#E0F2FE] border border-cyan-200/80 rounded-2xl py-3 px-5 text-center shadow-xs mb-4">
                    <h1 className="text-xl sm:text-2xl font-black text-[#0A2E5C] tracking-tight">
                      {useSampleHussamData ? 'Meeting People & Personal Information' : currentLesson.title}
                    </h1>
                  </div>

                  {/* Learning Objectives Box with Target Icon */}
                  <div className="bg-[#F0F9FF] border border-cyan-200 rounded-2xl p-4 flex items-center gap-3.5 shadow-xs mb-5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0284C7] to-cyan-400 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-[#0A2E5C] leading-none mb-1">
                        Learning Objectives
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-700 font-medium leading-snug">
                        {useSampleHussamData 
                          ? 'Introduce yourself and ask/answer questions using the verb be and question words.'
                          : currentLesson.student_book.learning_goal}
                      </p>
                    </div>
                  </div>

                  {/* Section 1: Listen and Read (Dialogue + Schoolboys Illustration) */}
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-6 h-6 rounded-full bg-[#0A2E5C] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                        1
                      </span>
                      <h2 className="text-base font-extrabold text-[#0A2E5C]">
                        Listen and Read
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
                      {/* Dialogue Script */}
                      <div className="md:col-span-7 space-y-2.5 text-xs sm:text-sm">
                        <div className="flex items-start gap-2">
                          <strong className="text-[#0A2E5C] w-16 shrink-0 font-bold">Hussam :</strong>
                          <span className="text-slate-800">
                            Hello! I'm Hussam. Are you new at Qaflah School?
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <strong className="text-[#0284C7] w-16 shrink-0 font-bold">Ayman :</strong>
                          <span className="text-slate-800">
                            Hi, Hussam. Yes, I am. My name is Ayman.
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <strong className="text-[#0A2E5C] w-16 shrink-0 font-bold">Hussam :</strong>
                          <span className="text-slate-800">
                            Nice to meet you, Ayman.
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <strong className="text-[#0284C7] w-16 shrink-0 font-bold">Ayman :</strong>
                          <span className="text-slate-800">
                            Nice to meet you, too!
                          </span>
                        </div>
                      </div>

                      {/* Educational Schoolboys Illustration */}
                      <div className="md:col-span-5 flex justify-center">
                        <div className="w-full max-w-[200px] bg-gradient-to-b from-cyan-100 to-sky-50 rounded-2xl p-3 border border-cyan-200 shadow-sm flex flex-col items-center text-center">
                          <div className="flex items-center justify-center gap-2 my-1">
                            {/* Student 1 Avatar */}
                            <div className="flex flex-col items-center">
                              <div className="w-14 h-14 rounded-full bg-white border-2 border-cyan-400 p-0.5 shadow-xs overflow-hidden flex items-center justify-center">
                                <img
                                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=150&q=80"
                                  alt="Hussam - Qaflah School"
                                  className="w-full h-full object-cover rounded-full"
                                  onError={(e) => {
                                    (e.target as HTMLElement).style.display = 'none';
                                  }}
                                />
                                <span className="font-bold text-xs text-[#0A2E5C]">Hussam</span>
                              </div>
                              <span className="text-[10px] font-bold text-slate-600 mt-1">Hussam</span>
                            </div>

                            {/* Conversation Icon */}
                            <div className="text-cyan-600 font-bold text-xs animate-pulse">
                              💬
                            </div>

                            {/* Student 2 Avatar */}
                            <div className="flex flex-col items-center">
                              <div className="w-14 h-14 rounded-full bg-white border-2 border-amber-400 p-0.5 shadow-xs overflow-hidden flex items-center justify-center">
                                <img
                                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80"
                                  alt="Ayman - Qaflah School"
                                  className="w-full h-full object-cover rounded-full"
                                  onError={(e) => {
                                    (e.target as HTMLElement).style.display = 'none';
                                  }}
                                />
                                <span className="font-bold text-xs text-[#D97706]">Ayman</span>
                              </div>
                              <span className="text-[10px] font-bold text-slate-600 mt-1">Ayman</span>
                            </div>
                          </div>
                          <span className="text-[10px] font-semibold text-slate-500 mt-1">
                            Qaflah School Students
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Two Rounded Cards (Key Vocabulary + Grammar Focus) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Left Card: Key Vocabulary */}
                    <div className="border border-cyan-300 rounded-2xl overflow-hidden shadow-xs bg-white">
                      <div className="bg-[#0284C7] text-white font-extrabold text-xs sm:text-sm text-center py-2 px-3 tracking-wide">
                        Key Vocabulary
                      </div>
                      <div className="p-3.5 space-y-1.5 text-xs sm:text-sm text-slate-800">
                        {useSampleHussamData ? (
                          <>
                            <div className="flex items-center justify-between">
                              <span className="font-semibold">• school</span>
                              <span className="font-arabic font-bold text-[#0A2E5C]">مدرسة</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-semibold">• student</span>
                              <span className="font-arabic font-bold text-[#0A2E5C]">طالب</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-semibold">• friend</span>
                              <span className="font-arabic font-bold text-[#0A2E5C]">صديق</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-semibold">• welcome</span>
                              <span className="font-arabic font-bold text-[#0A2E5C]">مرحباً</span>
                            </div>
                          </>
                        ) : (
                          currentLesson.student_book.vocabulary.slice(0, 4).map((v, i) => (
                            <div key={i} className="flex items-center justify-between">
                              <span className="font-semibold">• {v}</span>
                              <span className="font-arabic font-bold text-[#0A2E5C]">{getArabicWord(v)}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Right Card: Grammar Focus */}
                    <div className="border border-cyan-300 rounded-2xl overflow-hidden shadow-xs bg-white">
                      <div className="bg-[#0284C7] text-white font-extrabold text-xs sm:text-sm text-center py-2 px-3 tracking-wide">
                        Grammar Focus
                      </div>
                      <div className="p-3.5 text-xs sm:text-sm text-slate-800 font-medium space-y-1">
                        {useSampleHussamData ? (
                          <>
                            <p className="font-bold text-[#0A2E5C]">be: I am / You are</p>
                            <p className="pl-4">He is / She is</p>
                            <p className="pl-4">We are / They are</p>
                          </>
                        ) : (
                          <>
                            <p className="font-bold text-[#0A2E5C]">{currentLesson.student_book.language_focus_title}</p>
                            {currentLesson.student_book.language_focus_content.slice(0, 2).map((item, i) => (
                              <p key={i} className="text-xs text-slate-700 leading-snug">{item}</p>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Footer Wave: Solid Dark Navy with Cyan Right Swoosh and Page 5 */}
                <footer className="mt-8 pt-3 border-t-2 border-slate-200">
                  <div className="bg-[#0A2E5C] text-white rounded-xl px-5 py-2.5 flex items-center justify-between shadow-sm relative overflow-hidden">
                    <div className="text-xs font-bold font-mono tracking-wider z-10">
                      Grade {grade} • Academic Year 2027–2028
                    </div>
                    <div className="text-base font-black font-mono bg-[#0284C7] text-white px-3.5 py-1 rounded-lg z-10 shadow-xs">
                      5
                    </div>
                    {/* Cyan accent background shape */}
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0284C7] to-transparent opacity-80 pointer-events-none" />
                  </div>
                </footer>
              </article>
            )}

            {/* PAGE 7: PRACTICE */}
            {activeTemplatePage === 'practice' && (
              <article 
                className="textbook-sheet bg-white w-full max-w-[780px] min-h-[1080px] shadow-2xl rounded-3xl border-2 border-slate-300 p-8 sm:p-10 font-english text-slate-900 flex flex-col justify-between relative overflow-hidden transition-all"
                dir="ltr"
              >
                <div>
                  {/* Top Header Banner: Cyan/Navy gradient with Golden Star */}
                  <div className="bg-gradient-to-r from-[#0284C7] via-[#0A2E5C] to-[#0A2E5C] text-white rounded-2xl py-3 px-5 flex items-center gap-3 shadow-md mb-6">
                    <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-xs">
                      <Star className="w-5 h-5 fill-slate-950 text-slate-950" />
                    </div>
                    <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                      Practice
                    </h1>
                  </div>

                  {/* Section A: Answer the questions */}
                  <div className="space-y-3 mb-6">
                    <h2 className="text-sm sm:text-base font-extrabold text-[#0A2E5C]">
                      A. Answer the questions.
                    </h2>
                    <div className="space-y-3 pl-2 text-xs sm:text-sm">
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                        <span className="font-bold text-slate-800 w-44 shrink-0">1. Where are you from?</span>
                        <div className="border-b-2 border-slate-400 flex-1 h-5 min-w-[200px]" />
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                        <span className="font-bold text-slate-800 w-44 shrink-0">2. Where do you live?</span>
                        <div className="border-b-2 border-slate-400 flex-1 h-5 min-w-[200px]" />
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                        <span className="font-bold text-slate-800 w-44 shrink-0">3. How old are you?</span>
                        <div className="border-b-2 border-slate-400 flex-1 h-5 min-w-[200px]" />
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                        <span className="font-bold text-slate-800 w-44 shrink-0">4. Which grade are you in?</span>
                        <div className="border-b-2 border-slate-400 flex-1 h-5 min-w-[200px]" />
                      </div>
                    </div>
                  </div>

                  {/* Section B: Choose the correct answer */}
                  <div className="space-y-3 mb-6">
                    <h2 className="text-sm sm:text-base font-extrabold text-[#0A2E5C]">
                      B. Choose the correct answer.
                    </h2>
                    <div className="space-y-3 pl-2 text-xs sm:text-sm">
                      <div>
                        <p className="font-bold text-slate-800 mb-1">
                          1. I ______ from Shabwah.
                        </p>
                        <div className="flex items-center gap-8 pl-4 font-medium text-slate-700">
                          <span>a) am</span>
                          <span>b) is</span>
                          <span>c) are</span>
                        </div>
                      </div>

                      <div>
                        <p className="font-bold text-slate-800 mb-1">
                          2. She ______ thirteen years old.
                        </p>
                        <div className="flex items-center gap-8 pl-4 font-medium text-slate-700">
                          <span>a) is</span>
                          <span>b) are</span>
                          <span>c) am</span>
                        </div>
                      </div>

                      <div>
                        <p className="font-bold text-slate-800 mb-1">
                          3. We ______ in Grade 8.
                        </p>
                        <div className="flex items-center gap-8 pl-4 font-medium text-slate-700">
                          <span>a) is</span>
                          <span>b) are</span>
                          <span>c) am</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Golden Remember Card */}
                  <div className="bg-gradient-to-r from-amber-50 via-amber-100/60 to-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex items-center gap-3.5 shadow-xs">
                    <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-sm">
                      <Star className="w-6 h-6 fill-slate-950 text-slate-950" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-amber-950 leading-tight">
                        Remember!
                      </h3>
                      <p className="text-xs sm:text-sm text-amber-900 font-medium">
                        Use <strong className="text-slate-950 font-black">capital letters</strong> and punctuation.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Footer: Qaflah Basic Education School + Page 7 */}
                <footer className="mt-8 pt-3 border-t-2 border-slate-200">
                  <div className="bg-[#0A2E5C] text-white rounded-xl px-5 py-2.5 flex items-center justify-between shadow-sm relative overflow-hidden">
                    <div className="text-xs font-bold tracking-wider z-10">
                      Qaflah Basic Education School
                    </div>
                    <div className="text-base font-black font-mono bg-[#0284C7] text-white px-3.5 py-1 rounded-lg z-10 shadow-xs">
                      7
                    </div>
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0284C7] to-transparent opacity-80 pointer-events-none" />
                  </div>
                </footer>
              </article>
            )}

            {/* PAGE 10: REVIEW AND SELF-ASSESSMENT */}
            {activeTemplatePage === 'review' && (
              <article 
                className="textbook-sheet bg-white w-full max-w-[780px] min-h-[1080px] shadow-2xl rounded-3xl border-2 border-slate-300 p-8 sm:p-10 font-english text-slate-900 flex flex-col justify-between relative overflow-hidden transition-all"
                dir="ltr"
              >
                <div>
                  {/* Top Header Banner: Clipboard Icon with Review and Self-Assessment */}
                  <div className="bg-gradient-to-r from-[#0284C7] via-[#0A2E5C] to-[#0A2E5C] text-white rounded-2xl py-3 px-5 flex items-center gap-3 shadow-md mb-6">
                    <div className="w-8 h-8 rounded-full bg-white text-[#0A2E5C] flex items-center justify-center font-bold shadow-xs">
                      <ClipboardList className="w-5 h-5 text-[#0A2E5C]" />
                    </div>
                    <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                      Review and Self-Assessment
                    </h1>
                  </div>

                  {/* Section A: Match the words with their meanings */}
                  <div className="space-y-3 mb-6">
                    <h2 className="text-sm sm:text-base font-extrabold text-[#0A2E5C]">
                      A. Match the words with their meanings.
                    </h2>
                    <div className="space-y-3 pl-2 text-xs sm:text-sm">
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-slate-800 w-24">1. school</span>
                        <span className="font-mono text-slate-600 font-bold">(   )</span>
                        <span className="text-slate-800">a) a place to live</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-slate-800 w-24">2. friend</span>
                        <span className="font-mono text-slate-600 font-bold">(   )</span>
                        <span className="text-slate-800">b) a place to learn</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-slate-800 w-24">3. home</span>
                        <span className="font-mono text-slate-600 font-bold">(   )</span>
                        <span className="text-slate-800">c) a person you like</span>
                      </div>
                    </div>
                  </div>

                  {/* Section B: Write about yourself */}
                  <div className="space-y-4 mb-6">
                    <h2 className="text-sm sm:text-base font-extrabold text-[#0A2E5C]">
                      B. Write about yourself.
                    </h2>
                    <div className="space-y-3.5 pl-2 text-xs sm:text-sm">
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-slate-800">My name is</span>
                        <div className="border-b-2 border-slate-400 flex-1 h-5" />
                        <span>.</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-slate-800">I am</span>
                        <div className="border-b-2 border-slate-400 w-28 h-5" />
                        <span className="font-bold text-slate-800">years old.</span>
                        <div className="border-b-2 border-slate-400 flex-1 h-5" />
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-slate-800">I live in</span>
                        <div className="border-b-2 border-slate-400 flex-1 h-5" />
                        <span>.</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-slate-800">I am in Grade</span>
                        <div className="border-b-2 border-slate-400 w-32 h-5" />
                        <span>.</span>
                      </div>
                    </div>
                  </div>

                  {/* Motivational Banner: You Can Do It! with 3D Star */}
                  <div className="bg-[#0A2E5C] text-white rounded-2xl p-4 flex items-center justify-center gap-4 shadow-md relative overflow-hidden my-6">
                    <div className="relative">
                      <Star className="w-12 h-12 fill-amber-400 text-amber-400 drop-shadow-md transform -rotate-12" />
                    </div>
                    <span className="text-2xl sm:text-3xl font-black tracking-wide text-white font-display italic">
                      You can do it!
                    </span>
                  </div>
                </div>

                {/* Bottom Footer: Grade 8 • Academic Year 2027–2028 + Page 10 */}
                <footer className="mt-8 pt-3 border-t-2 border-slate-200">
                  <div className="bg-[#0A2E5C] text-white rounded-xl px-5 py-2.5 flex items-center justify-between shadow-sm relative overflow-hidden">
                    <div className="text-xs font-bold font-mono tracking-wider z-10">
                      Grade 8 • Academic Year 2027–2028
                    </div>
                    <div className="text-base font-black font-mono bg-[#0284C7] text-white px-3.5 py-1 rounded-lg z-10 shadow-xs">
                      10
                    </div>
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0284C7] to-transparent opacity-80 pointer-events-none" />
                  </div>
                </footer>
              </article>
            )}

            {/* PAGE 3: TABLE OF CONTENTS */}
            {activeTemplatePage === 'contents' && (
              <article 
                className="textbook-sheet bg-white w-full max-w-[780px] min-h-[1080px] shadow-2xl rounded-3xl border-2 border-slate-300 p-8 sm:p-10 font-english text-slate-900 flex flex-col justify-between relative overflow-hidden transition-all"
                dir="ltr"
              >
                <div>
                  {/* Top Header: Cyan Curved Banner with Book Icon */}
                  <div className="bg-[#0A2E5C] text-white rounded-2xl py-3 px-5 flex items-center justify-center gap-3 shadow-md mb-6 relative overflow-hidden">
                    <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-xs">
                      <BookOpen className="w-5 h-5 text-slate-950" />
                    </div>
                    <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                      Table of Contents
                    </h1>
                  </div>

                  {/* The 15 Units Table */}
                  <div className="border border-cyan-300 rounded-2xl overflow-hidden shadow-xs">
                    <table className="w-full text-xs sm:text-sm text-left border-collapse">
                      <thead>
                        <tr className="bg-[#0284C7] text-white font-extrabold">
                          <th className="py-2.5 px-4 text-left">Unit / Lesson Range</th>
                          <th className="py-2.5 px-4 text-right w-20">Page</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-cyan-100">
                        {[
                          { unit: 'Unit 1: About Me & My World (1–6)', page: 5 },
                          { unit: 'Unit 2: My Daily Life (7–12)', page: 11 },
                          { unit: 'Unit 3: My School & Classroom (13–18)', page: 17 },
                          { unit: 'Unit 4: People Around Me (19–24)', page: 25 },
                          { unit: 'Unit 5: Food & Drinks (25–30)', page: 31 },
                          { unit: 'Unit 6: Healthy Life (31–36)', page: 37 },
                          { unit: 'Unit 7: Hobbies & Free Time (37–42)', page: 45 },
                          { unit: 'Unit 8: My Town & Places (43–48)', page: 51 },
                          { unit: 'Unit 9: Weather & Clothes (49–54)', page: 57 },
                          { unit: 'Unit 10: Yesterday (55–60)', page: 65 },
                          { unit: 'Unit 11: My Past Story (61–66)', page: 71 },
                          { unit: 'Unit 12: Stories & Adventures (67–72)', page: 77 },
                          { unit: 'Unit 13: Plans & The Future (73–78)', page: 84 },
                          { unit: 'Unit 14: Problems & Solutions (79–84)', page: 90 },
                          { unit: 'Unit 15: My English Project (85–90)', page: 96 },
                          { unit: 'Review Units', page: 101, bold: true },
                          { unit: 'Word List', page: 105, bold: true },
                          { unit: 'References', page: 108, bold: true },
                        ].map((row, idx) => (
                          <tr 
                            key={idx}
                            className={`${idx % 2 === 0 ? 'bg-[#F0F9FF]' : 'bg-white'} hover:bg-cyan-100/50 transition-colors ${row.bold ? 'font-bold text-[#0A2E5C]' : 'text-slate-800'}`}
                          >
                            <td className="py-1.5 px-4">{row.unit}</td>
                            <td className="py-1.5 px-4 text-right font-mono font-bold">{row.page}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Bottom Footer: Qaflah Basic Education School + Page 3 */}
                <footer className="mt-8 pt-3 border-t-2 border-slate-200">
                  <div className="bg-[#0A2E5C] text-white rounded-xl px-5 py-2.5 flex items-center justify-between shadow-sm relative overflow-hidden">
                    <div className="text-xs font-bold tracking-wider z-10">
                      Qaflah Basic Education School
                    </div>
                    <div className="text-base font-black font-mono bg-[#0284C7] text-white px-3.5 py-1 rounded-lg z-10 shadow-xs">
                      3
                    </div>
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0284C7] to-transparent opacity-80 pointer-events-none" />
                  </div>
                </footer>
              </article>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 2: 4-PAGE COMPOSITE BOOK SPREAD (User's Exact Screenshot)*/}
        {/* ------------------------------------------------------------- */}
        {activeTemplatePage === 'spread' && (
          <div className="space-y-6">
            <div className="bg-[#0A2E5C] text-white p-4 rounded-2xl flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                <span className="font-bold font-arabic text-sm">
                  المعاينة الشاملة للصفحات الأربع (مطابقة 100% لملف التصميم المعتمد المرفق)
                </span>
              </div>
              <button
                onClick={onPrint}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold font-arabic transition flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>طباعة الصفحات</span>
              </button>
            </div>

            {/* Grid of the 4 Pages side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {/* Thumbnail 1: Table of Contents */}
              <div 
                onClick={() => setActiveTemplatePage('contents')}
                className="bg-white rounded-2xl border-2 border-slate-300 p-4 shadow-lg hover:border-cyan-500 cursor-pointer transition transform hover:-translate-y-1 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0A2E5C] font-mono">Page 3</span>
                  <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold font-arabic">الفهرس</span>
                </div>
                <div className="h-64 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden p-2 text-[8px] space-y-1">
                  <div className="bg-[#0A2E5C] text-white p-1 rounded text-center font-bold">Table of Contents</div>
                  <div className="space-y-0.5 text-slate-600 font-mono">
                    <p>Unit 1: About Me (1-6) .... 5</p>
                    <p>Unit 2: My Daily Life (7-12) .... 11</p>
                    <p>Unit 3: Classroom (13-18) .... 17</p>
                    <p>Unit 4: People (19-24) .... 25</p>
                    <p>Unit 5: Food & Drinks .... 31</p>
                    <p>Unit 6: Healthy Life .... 37</p>
                    <p>Unit 7: Hobbies .... 45</p>
                    <p>Unit 8: My Town .... 51</p>
                  </div>
                </div>
                <button className="w-full py-1.5 bg-slate-100 hover:bg-[#0A2E5C] hover:text-white rounded-xl text-xs font-bold font-arabic transition">
                  عرض وتكبير صفحة 3
                </button>
              </div>

              {/* Thumbnail 2: Lesson 1 */}
              <div 
                onClick={() => setActiveTemplatePage('lesson')}
                className="bg-white rounded-2xl border-2 border-slate-300 p-4 shadow-lg hover:border-cyan-500 cursor-pointer transition transform hover:-translate-y-1 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0A2E5C] font-mono">Page 5</span>
                  <span className="text-[10px] bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded font-bold font-arabic">درس 1</span>
                </div>
                <div className="h-64 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden p-2 text-[8px] space-y-1.5">
                  <div className="flex"><span className="bg-[#0A2E5C] text-white px-2 py-0.5 rounded-l">Unit 1</span><span className="bg-amber-400 text-slate-900 px-2 py-0.5 rounded-r">Lesson 1</span></div>
                  <div className="bg-cyan-100 p-1 rounded text-center font-bold text-[#0A2E5C]">Meeting People & Info</div>
                  <div className="bg-white border p-1 rounded">🎯 Learning Objectives: Verb be...</div>
                  <div className="bg-white border p-1 rounded">1. Listen and Read (Hussam & Ayman)</div>
                  <div className="grid grid-cols-2 gap-1 text-[7px]"><div className="border bg-cyan-50 p-0.5 rounded">Vocabulary: school, student...</div><div className="border bg-cyan-50 p-0.5 rounded">Grammar: I am, You are...</div></div>
                </div>
                <button className="w-full py-1.5 bg-slate-100 hover:bg-[#0A2E5C] hover:text-white rounded-xl text-xs font-bold font-arabic transition">
                  عرض وتكبير صفحة 5
                </button>
              </div>

              {/* Thumbnail 3: Practice */}
              <div 
                onClick={() => setActiveTemplatePage('practice')}
                className="bg-white rounded-2xl border-2 border-slate-300 p-4 shadow-lg hover:border-cyan-500 cursor-pointer transition transform hover:-translate-y-1 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0A2E5C] font-mono">Page 7</span>
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold font-arabic">التمارين</span>
                </div>
                <div className="h-64 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden p-2 text-[8px] space-y-1.5">
                  <div className="bg-gradient-to-r from-cyan-600 to-[#0A2E5C] text-white p-1 rounded font-bold">⭐ Practice</div>
                  <div className="space-y-0.5">
                    <p className="font-bold">A. Answer the questions:</p>
                    <p>1. Where are you from? ___________</p>
                    <p>2. Where do you live? ___________</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-bold">B. Choose the correct answer:</p>
                    <p>1. I ____ from Shabwah (am / is / are)</p>
                  </div>
                  <div className="bg-amber-100 border border-amber-300 p-1 rounded text-amber-900 font-bold">⭐ Remember! Capital letters</div>
                </div>
                <button className="w-full py-1.5 bg-slate-100 hover:bg-[#0A2E5C] hover:text-white rounded-xl text-xs font-bold font-arabic transition">
                  عرض وتكبير صفحة 7
                </button>
              </div>

              {/* Thumbnail 4: Review and Assessment */}
              <div 
                onClick={() => setActiveTemplatePage('review')}
                className="bg-white rounded-2xl border-2 border-slate-300 p-4 shadow-lg hover:border-cyan-500 cursor-pointer transition transform hover:-translate-y-1 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0A2E5C] font-mono">Page 10</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold font-arabic">التقييم</span>
                </div>
                <div className="h-64 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden p-2 text-[8px] space-y-1.5">
                  <div className="bg-[#0A2E5C] text-white p-1 rounded font-bold">📋 Review & Self-Assessment</div>
                  <p className="font-bold">A. Match words: school, friend, home</p>
                  <p className="font-bold">B. Write about yourself: My name is...</p>
                  <div className="bg-[#0A2E5C] text-white p-2 rounded text-center font-bold text-[10px]">🌟 You can do it!</div>
                </div>
                <button className="w-full py-1.5 bg-slate-100 hover:bg-[#0A2E5C] hover:text-white rounded-xl text-xs font-bold font-arabic transition">
                  عرض وتكبير صفحة 10
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Reference Image Modal Showcase */}
      {showReferenceModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 no-print"
          onClick={() => setShowReferenceModal(false)}
          dir="rtl"
        >
          <div 
            className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border-2 border-slate-300"
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-[#0A2E5C] text-white px-6 py-4 flex items-center justify-between border-b-4 border-[#F59E0B] shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 rounded-lg bg-[#0284C7] text-white">
                  <Eye className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-bold font-arabic text-base sm:text-lg text-white">
                    النموذج المرجعي المعتمد لتصميم وإخراج صفحات الكتاب
                  </h3>
                  <p className="text-xs text-cyan-200 font-arabic">
                    الصفحات الأربع المعتمدة لمدرسة قفلة الأساسية (الفهرس، صفحة الدرس، التمارين، المراجعة والتقييم)
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowReferenceModal(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-slate-900 flex items-center justify-center">
              <img 
                src="/assets/aistudio/IMG_20261104_210047_cee3207f.png" 
                alt="Approved Internal Textbook Design - Qaflah Basic Education School"
                className="max-w-full h-auto rounded-xl shadow-2xl border border-white/20"
              />
            </div>

            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs font-arabic text-slate-600 shrink-0">
              <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" />
                <span>جميع قوالب الاستوديو البرمجية مطابقة تماماً لهذا النموذج في الألوان والأبعاد والخطوط.</span>
              </span>
              <button
                onClick={() => setShowReferenceModal(false)}
                className="px-4 py-2 bg-[#0A2E5C] text-white rounded-xl font-bold hover:bg-[#133659] transition"
              >
                إغلاق والعودة للمحرر
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Embedded Full PDF Preview Modal */}
      <PDFPreviewModal
        book={previewBook}
        isOpen={!!previewBook}
        onClose={() => setPreviewBook(null)}
      />
    </div>
  );
};
