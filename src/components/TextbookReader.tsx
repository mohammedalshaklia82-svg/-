import React, { useState, useMemo } from 'react';
import { 
  BookOpen, ChevronRight, ChevronLeft, Volume2, Search, CheckCircle, 
  HelpCircle, Sparkles, MessageCircle, FileText, CheckSquare, 
  Printer, ArrowRight, UserCheck, ShieldAlert, Award, Clock,
  Users, MapPin, Eye, Columns, Maximize2, Share2, Compass, Bookmark,
  ToggleLeft, ToggleRight, School, Download, FileDown, Check, X,
  Image as ImageIcon, BookMarked, Layers, ArrowLeft
} from 'lucide-react';
import { Lesson, Unit } from '../types/curriculum';
import { speakText, stopSpeaking } from '../utils/speech';
import { PDFPreviewModal, PDFBookPreview } from './PDFPreviewModal';

interface TextbookReaderProps {
  grade: 7 | 8;
  lessons: Lesson[];
  units: Unit[];
  currentLessonNum: number;
  onSelectLesson: (num: number) => void;
  onPrintLesson: () => void;
  isPrintFriendly: boolean;
  setIsPrintFriendly: (enabled: boolean) => void;
}

export const TextbookReader: React.FC<TextbookReaderProps> = ({
  grade,
  lessons,
  units,
  currentLessonNum,
  onSelectLesson,
  onPrintLesson,
  isPrintFriendly,
  setIsPrintFriendly
}) => {
  const [viewMode, setViewMode] = useState<'student' | 'teacher' | 'split'>('student');
  const [pageViewType, setPageViewType] = useState<'cover' | 'lesson' | 'all'>('lesson');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUnitFilter, setSelectedUnitFilter] = useState<number | 'all'>('all');
  const [speakingText, setSpeakingText] = useState<string | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [checkedAnswers, setCheckedAnswers] = useState<Record<number, boolean>>({});
  const [previewPDFModal, setPreviewPDFModal] = useState<PDFBookPreview | null>(null);

  // Current lesson
  const currentLesson = useMemo(() => {
    return lessons.find(l => l.lesson_number === currentLessonNum) || lessons[0];
  }, [lessons, currentLessonNum]);

  // Current unit for this lesson
  const currentUnit = useMemo(() => {
    return units.find(u => u.unit_number === currentLesson.unit_number) || units[0];
  }, [units, currentLesson]);

  // Filtered lessons for sidebar / selector
  const filteredLessons = useMemo(() => {
    return lessons.filter(l => {
      const matchUnit = selectedUnitFilter === 'all' || l.unit_number === selectedUnitFilter;
      const matchQuery = !searchQuery || 
        l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.lesson_number.toString() === searchQuery.trim() ||
        l.student_book.learning_goal.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchUnit && matchQuery;
    });
  }, [lessons, selectedUnitFilter, searchQuery]);

  const handleSpeak = (text: string) => {
    if (speakingText === text) {
      stopSpeaking();
      setSpeakingText(null);
    } else {
      setSpeakingText(text);
      speakText(text, () => setSpeakingText(null));
    }
  };

  const toggleSelfCheck = () => {
    setCheckedAnswers(prev => ({
      ...prev,
      [currentLesson.lesson_number]: !prev[currentLesson.lesson_number]
    }));
  };

  // Helper for current book metadata and download links
  const currentBookMeta = useMemo(() => {
    const isStudent = viewMode === 'student' || viewMode === 'split';
    if (grade === 7) {
      return isStudent
        ? {
            title_ar: 'كتاب الطالب — الصف السابع الأساسي',
            title_en: 'Grade 7 Student Book',
            pages: 94,
            pdf_url: '/downloads/Qaflah_Grade7_Student_Book_HADA_REDESIGNED.pdf',
            docx_url: '/downloads/Qaflah_Grade7_Student_Book_HADA_REDESIGNED.docx',
            cover_url: '/covers/cover_grade7_student_book.png',
            size_pdf: '2.18 MB',
            size_docx: '665 KB'
          }
        : {
            title_ar: 'دليل المعلم — الصف السابع الأساسي',
            title_en: "Grade 7 Teacher's Guide",
            pages: 70,
            pdf_url: '/downloads/Qaflah_Grade7_Teacher_Guide_HADA_REDESIGNED.pdf',
            docx_url: '/downloads/Qaflah_Grade7_Teacher_Guide_HADA_REDESIGNED.docx',
            cover_url: '/covers/cover_grade7_teachers_guide.png',
            size_pdf: '2.44 MB',
            size_docx: '674 KB'
          };
    } else {
      return isStudent
        ? {
            title_ar: 'كتاب الطالب — الصف الثامن الأساسي',
            title_en: 'Grade 8 Student Book',
            pages: 94,
            pdf_url: '/downloads/Qaflah_Grade8_Student_Book_HADA_REDESIGNED.pdf',
            docx_url: '/downloads/Qaflah_Grade8_Student_Book_HADA_REDESIGNED.docx',
            cover_url: '/covers/cover_grade8_student_book.png',
            size_pdf: '2.30 MB',
            size_docx: '747 KB'
          }
        : {
            title_ar: 'دليل المعلم — الصف الثامن الأساسي',
            title_en: "Grade 8 Teacher's Guide",
            pages: 69,
            pdf_url: '/downloads/Qaflah_Grade8_Teacher_Guide_HADA_REDESIGNED.pdf',
            docx_url: '/downloads/Qaflah_Grade8_Teacher_Guide_HADA_REDESIGNED.docx',
            cover_url: '/covers/cover_grade8_teachers_guide.png',
            size_pdf: '2.50 MB',
            size_docx: '645 KB'
          };
    }
  }, [grade, viewMode]);

  // Helper for topic illustration tag icons
  const getTopicIllustrationBadge = (lesson: Lesson) => {
    const title = lesson.title.toLowerCase();
    if (title.includes('letter') || title.includes('alphabet')) {
      return { icon: '🔤', label: 'Alphabet & Phonics', color: 'bg-teal-50 text-teal-700 border-teal-200' };
    }
    if (title.includes('meeting') || title.includes('family') || title.includes('people')) {
      return { icon: '👥', label: 'People & Dialogue', color: 'bg-blue-50 text-blue-700 border-blue-200' };
    }
    if (title.includes('routine') || title.includes('time') || title.includes('day')) {
      return { icon: '⏰', label: 'Routines & Habit', color: 'bg-amber-50 text-amber-700 border-amber-200' };
    }
    if (title.includes('food') || title.includes('menu') || title.includes('eating')) {
      return { icon: '🥗', label: 'Food & Nutrition', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    }
    if (title.includes('health') || title.includes('clinic') || title.includes('advice')) {
      return { icon: '🏥', label: 'Health & Habits', color: 'bg-rose-50 text-rose-700 border-rose-200' };
    }
    if (title.includes('place') || title.includes('town') || title.includes('direction') || title.includes('shabwah')) {
      return { icon: '🗺️', label: 'Places & Town', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
    }
    if (title.includes('weather') || title.includes('season')) {
      return { icon: '☀️', label: 'Weather & Clothes', color: 'bg-sky-50 text-sky-700 border-sky-200' };
    }
    if (title.includes('review') || title.includes('assessment') || title.includes('achievement')) {
      return { icon: '⭐', label: 'Review & Mastery', color: 'bg-purple-50 text-purple-700 border-purple-200' };
    }
    return { icon: '📖', label: 'Language Focus', color: 'bg-slate-50 text-slate-700 border-slate-200' };
  };

  const topicBadge = getTopicIllustrationBadge(currentLesson);

  return (
    <div className={`min-h-screen pb-16 transition-colors ${isPrintFriendly ? 'bg-white' : 'bg-[#F1F5F9]'}`}>
      
      {/* Control Toolbar (Hidden during actual print) */}
      <div className={`border-b sticky top-[102px] z-40 px-4 py-2.5 transition-colors no-print ${
        isPrintFriendly ? 'bg-white border-slate-300 shadow-sm' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: View Mode Toggle */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => { setViewMode('student'); setPageViewType('lesson'); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'student' && pageViewType !== 'cover'
                  ? 'bg-[#0A2540] text-white shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>كتاب الطالب (Student Book)</span>
            </button>

            <button
              onClick={() => { setViewMode('teacher'); setPageViewType('lesson'); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'teacher' && pageViewType !== 'cover'
                  ? 'bg-[#0891B2] text-white shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-yellow-300" />
              <span>دليل المعلم (Teacher Guide)</span>
            </button>

            <button
              onClick={() => { setViewMode('split'); setPageViewType('lesson'); }}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'split'
                  ? 'bg-[#D97706] text-white shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Columns className="w-3.5 h-3.5 text-white" />
              <span>عرض متطابق (Side-by-Side)</span>
            </button>
          </div>

          {/* Center: Navigation / Cover Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPageViewType(pageViewType === 'cover' ? 'lesson' : 'cover')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 shadow-sm ${
                pageViewType === 'cover'
                  ? 'bg-amber-500 text-white border-amber-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>{pageViewType === 'cover' ? 'العودة للدروس' : 'عرض الغلاف الرسمي'}</span>
            </button>

            {pageViewType !== 'cover' && (
              <>
                <button
                  onClick={() => onSelectLesson(Math.max(1, currentLessonNum - 1))}
                  disabled={currentLessonNum === 1}
                  className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm transition"
                >
                  <ChevronRight className="w-4 h-4" />
                  <span className="hidden sm:inline">الدرس السابق</span>
                </button>

                <div className="px-3 py-1 bg-[#0A2540] text-white rounded-lg text-xs font-bold font-mono tracking-wider shadow-inner">
                  LESSON {currentLesson.lesson_number} / 90
                </div>

                <button
                  onClick={() => onSelectLesson(Math.min(90, currentLessonNum + 1))}
                  disabled={currentLessonNum === 90}
                  className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm transition"
                >
                  <span className="hidden sm:inline">الدرس التالي</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* Right: Print-Friendly Controls & PDF Export */}
          <div className="flex items-center gap-2">
            {/* Answer Key Toggle */}
            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                showAnswers
                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">{showAnswers ? 'إخفاء الإجابات' : 'عرض إجابات المعلم'}</span>
              <span className="sm:hidden">{showAnswers ? 'إخفاء' : 'الإجابات'}</span>
            </button>

            {/* Print Mode Toggle Button */}
            <button
              onClick={() => setIsPrintFriendly(!isPrintFriendly)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 shadow-sm ${
                isPrintFriendly
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
              title="تفعيل التخطيط الموحد بعمود واحد والخلفية البيضاء لتصدير PDF عالي الجودة"
            >
              <Printer className={`w-3.5 h-3.5 ${isPrintFriendly ? 'text-white' : 'text-slate-600'}`} />
              <span className="hidden md:inline">{isPrintFriendly ? 'وضع الطباعة نشط' : 'تفعيل وضع الطباعة'}</span>
            </button>

            {/* Direct Export to PDF */}
            <button
              onClick={onPrintLesson}
              className="px-3.5 py-1.5 bg-[#0891B2] hover:bg-[#0e7490] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow transition active:scale-95"
              title="فتح نافذة التصدير والطباعة كملف PDF"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>تصدير PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Prominent Quick Book Download Ribbon */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0A2540] to-slate-900 text-white py-2 px-4 border-b border-amber-500/30 no-print shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-400 font-arabic flex items-center gap-1">
              <Download className="w-3.5 h-3.5" />
              <span>تحميل الكتاب الحالي المفتوح:</span>
            </span>
            <span className="text-white font-semibold">
              {currentBookMeta.title_ar} ({currentBookMeta.pages} صفحة)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Download / Preview Complete Book PDF */}
            <button
              onClick={() => {
                setPreviewPDFModal({
                  title_ar: currentBookMeta.title_ar,
                  title_en: currentBookMeta.title_en,
                  grade: grade,
                  mode: viewMode === 'teacher' ? 'teacher' : 'student',
                  pdf_url: currentBookMeta.pdf_url,
                  docx_url: currentBookMeta.docx_url,
                  cover_url: currentBookMeta.cover_url,
                  pdf_pages: currentBookMeta.pages,
                  pdf_size: currentBookMeta.size_pdf,
                  docx_size: currentBookMeta.size_docx
                });
              }}
              className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold flex items-center gap-1.5 shadow-sm transition active:scale-95"
              title={`معاينة وتحميل نسخة الطباعة PDF الكاملة (${currentBookMeta.size_pdf})`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>معاينة وتحميل PDF</span>
              <span className="text-[10px] opacity-75 font-mono">({currentBookMeta.size_pdf})</span>
            </button>

            {/* Download Word DOCX */}
            <a
              href={currentBookMeta.docx_url}
              download
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold flex items-center gap-1.5 shadow-sm transition"
              title={`تنزيل نسخة وورد قابلة للتعديل (${currentBookMeta.size_docx})`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>تنزيل Word DOCX</span>
            </a>

            {/* Download Cover Image PNG */}
            <a
              href={currentBookMeta.cover_url}
              download
              className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold flex items-center gap-1.5 shadow-sm transition"
              title="تنزيل الغلاف الأصلي بدقة عالية"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>تنزيل الغلاف PNG</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className={`max-w-7xl mx-auto px-4 mt-6 ${isPrintFriendly ? '' : 'grid grid-cols-1 lg:grid-cols-12 gap-6'}`}>
        
        {/* Sidebar: Lesson Navigator (3 cols) - Hidden when isPrintFriendly is enabled */}
        {!isPrintFriendly && (
          <div className="lg:col-span-3 order-2 lg:order-1 no-print">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sticky top-[215px]">
              
              {/* Cover Quick Jump Button */}
              <button
                onClick={() => setPageViewType('cover')}
                className={`w-full mb-3 p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                  pageViewType === 'cover'
                    ? 'bg-[#D97706] text-white border-amber-600 shadow-md'
                    : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  <span>عرض صفحة الغلاف الرسمي</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 bg-black/10 rounded">معتمد</span>
              </button>

              {/* Header info */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-[#0891B2]" />
                  <h3 className="text-sm font-bold font-arabic text-slate-900">
                    فهرس الدروس (Lessons 1–90)
                  </h3>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-bold">
                  90 درساً
                </span>
              </div>

              {/* Search Input */}
              <div className="mt-3 relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="ابحث برقم الدرس، العنوان، أو المفردة..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pr-8 pl-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0891B2] text-slate-800 placeholder-slate-400"
                />
              </div>

              {/* Unit Filter Selector */}
              <div className="mt-2.5">
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                  تصفية حسب الوحدة (Unit):
                </label>
                <select
                  value={selectedUnitFilter}
                  onChange={e => setSelectedUnitFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0891B2]"
                >
                  <option value="all">جميع الوحدات (Units 1 – 15)</option>
                  {units.map(u => (
                    <option key={u.unit_number} value={u.unit_number}>
                      Unit {u.unit_number} ({u.lessons_range}) - {u.topic.slice(0, 32)}...
                    </option>
                  ))}
                </select>
              </div>

              {/* Lessons Scroll List */}
              <div className="mt-3 space-y-1 max-h-[50vh] overflow-y-auto pr-1 scrollbar-thin">
                {filteredLessons.map(l => {
                  const isSelected = pageViewType === 'lesson' && l.lesson_number === currentLessonNum;
                  return (
                    <button
                      key={l.lesson_number}
                      onClick={() => {
                        onSelectLesson(l.lesson_number);
                        setPageViewType('lesson');
                      }}
                      className={`w-full text-right p-2.5 rounded-xl text-xs transition-all flex items-start gap-2.5 ${
                        isSelected
                          ? 'bg-[#0A2540] text-white shadow-md'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <span className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center font-mono font-bold text-[11px] ${
                        isSelected
                          ? 'bg-[#D97706] text-white shadow-sm'
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {l.lesson_number}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className={`font-semibold truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                          {l.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5 text-[10px]">
                          <span className={isSelected ? 'text-cyan-200' : 'text-slate-500'}>
                            Unit {l.unit_number} • Page {l.page}
                          </span>
                          <span className={`px-1 rounded text-[9px] ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                            {l.category.split('&')[0]}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Center: The Textbook Sheet / Cover Page */}
        <div className={`${isPrintFriendly ? 'max-w-4xl mx-auto w-full' : 'lg:col-span-9 order-1 lg:order-2'}`}>
          
          {/* SPECIAL VIEW: COVER PAGE SHOWCASE */}
          {pageViewType === 'cover' ? (
            <div className="textbook-sheet bg-white rounded-3xl border-2 border-slate-300 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0A2540] text-amber-400 flex items-center justify-center font-bold text-sm shadow">
                    {grade}
                  </div>
                  <div>
                    <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold">
                      صفحة الغلاف الفني الأصلي المعتمد (Official Cover Page)
                    </span>
                    <h3 className="text-lg font-bold font-arabic text-slate-900 mt-0.5">
                      {currentBookMeta.title_ar} — العام الدراسي 2027–2028
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={currentBookMeta.cover_url}
                    download
                    className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>تنزيل الغلاف PNG</span>
                  </a>

                  <button
                    onClick={() => { setPageViewType('lesson'); onSelectLesson(1); }}
                    className="px-3.5 py-1.5 bg-[#0A2540] hover:bg-[#133659] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
                  >
                    <span>الدخول للدرس 1</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Large Cover Preview */}
              <div className="max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-[#0A2540]">
                <img
                  src={currentBookMeta.cover_url}
                  alt={currentBookMeta.title_ar}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Cover Metadata & Location Verification */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs text-slate-700 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>تأكيد اعتماد سطر الموقع الجغرافي المصحح على الغلاف:</span>
                </div>
                <p className="font-mono text-sm bg-white p-2.5 rounded-xl border border-slate-300 text-[#0A2540] font-bold text-center">
                  Hada Region, Habban, Shabwah, Yemen
                </p>
                <p className="text-slate-500 font-arabic text-center">
                  تم اعتماد الغلاف الرسمي لمدرسة قفلة الأساسية دون أي تغيير مع مطابقة الألوان: الأزرق الداكن، الفيروزي، الأصفر الذهبي، والأبيض.
                </p>
              </div>

              {/* Action Buttons to Download Book */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    setPreviewPDFModal({
                      title_ar: currentBookMeta.title_ar,
                      title_en: currentBookMeta.title_en,
                      grade: grade,
                      mode: viewMode === 'teacher' ? 'teacher' : 'student',
                      pdf_url: currentBookMeta.pdf_url,
                      docx_url: currentBookMeta.docx_url,
                      cover_url: currentBookMeta.cover_url,
                      pdf_pages: currentBookMeta.pages,
                      pdf_size: currentBookMeta.size_pdf,
                      docx_size: currentBookMeta.size_docx
                    });
                  }}
                  className="py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition active:scale-95"
                >
                  <Eye className="w-4 h-4" />
                  <span>معاينة وتحميل الكتاب كاملاً PDF مع الغلاف ({currentBookMeta.size_pdf})</span>
                </button>

                <a
                  href={currentBookMeta.docx_url}
                  download
                  className="py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-md transition"
                >
                  <FileText className="w-4 h-4" />
                  <span>تحميل نسخة وورد Word DOCX الكاملة ({currentBookMeta.size_docx})</span>
                </a>
              </div>

            </div>
          ) : (
            <div className={`grid gap-6 ${viewMode === 'split' && !isPrintFriendly ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1'}`}>
              
              {/* 1. STUDENT BOOK PAGE LAYOUT */}
              {(viewMode === 'student' || viewMode === 'split' || isPrintFriendly) && (
                <article aria-label="ورقة درس كتاب الطالب" className={`textbook-sheet bg-white rounded-3xl overflow-hidden flex flex-col justify-between transition-all ${
                  isPrintFriendly
                    ? 'border-2 border-slate-400 p-0 shadow-none'
                    : 'border-2 border-slate-300 shadow-xl'
                }`}>
                  
                  {/* Printable Official Teacher / Student Header (Printed on paper / PDF) */}
                  <header className="bg-slate-100/90 text-slate-900 px-6 py-3 border-b-2 border-slate-300 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#0A2540] text-amber-400 flex items-center justify-center font-bold text-sm shadow-sm border border-amber-500">
                        QS
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-wider font-english">
                          REPUBLIC OF YEMEN • MINISTRY OF EDUCATION • SHABWAH
                        </p>
                        <h4 className="text-xs sm:text-sm font-bold font-arabic text-slate-900">
                          مدرسة قفلة الأساسية • وادي هدى – حبان – شبوة
                        </h4>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs font-english">
                      <span className="px-2.5 py-1 bg-white border border-slate-300 rounded font-bold font-mono">
                        Grade {grade} Student Book
                      </span>
                      <span className="px-2.5 py-1 bg-[#0A2540] text-white rounded font-mono font-bold">
                        Unit {currentUnit.unit_number} • Lesson {currentLesson.lesson_number}
                      </span>
                      <span className="px-2 py-1 bg-[#0891B2] text-white rounded font-mono font-bold">
                        p. {currentLesson.page}
                      </span>
                    </div>
                  </header>

                  {/* Printable Student Information Line (For classroom handouts) */}
                  <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-english text-slate-700">
                    <div>
                      <span className="font-bold text-slate-900">Student Name: </span>
                      <span className="text-slate-400">___________________________</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">Section: </span>
                      <span className="text-slate-400">______</span>
                      <span className="font-bold text-slate-900 mr-2">Date: </span>
                      <span className="text-slate-400">___/___/202_</span>
                    </div>
                    <div className="text-left font-arabic text-[11px] text-slate-500">
                      <span>العام الدراسي 2027–2028</span>
                    </div>
                  </div>

                  {/* Lesson Main Body: Top-to-Bottom Balanced Distribution */}
                  <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                    
                    {/* Lesson Title Banner */}
                    <div className={`p-4 rounded-2xl relative overflow-hidden ${
                      isPrintFriendly
                        ? 'bg-slate-100 text-slate-900 border-2 border-slate-300'
                        : 'bg-gradient-to-r from-[#0A2540] via-[#0D3B66] to-[#0891B2] text-white shadow-md'
                    }`}>
                      <div className="flex flex-wrap items-center justify-between gap-2 relative z-10">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full font-mono uppercase ${
                              isPrintFriendly ? 'bg-[#0A2540] text-white' : 'bg-[#D97706] text-white'
                            }`}>
                              Lesson {currentLesson.lesson_number}
                            </span>
                            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${topicBadge.color}`}>
                              {topicBadge.icon} {topicBadge.label}
                            </span>
                            <span className={`text-[11px] font-mono ${isPrintFriendly ? 'text-slate-600' : 'text-cyan-200'}`}>
                              Unit {currentUnit.unit_number}: {currentUnit.topic.split(':')[0]}
                            </span>
                          </div>
                          <h2 className={`text-xl sm:text-2xl font-black font-english tracking-tight ${
                            isPrintFriendly ? 'text-slate-900' : 'text-white'
                          }`}>
                            {currentLesson.title}
                          </h2>
                        </div>

                        {!isPrintFriendly && (
                          <button
                            onClick={() => handleSpeak(`${currentLesson.title}. Goal: ${currentLesson.student_book.learning_goal}`)}
                            className="p-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-all shadow-sm active:scale-95 no-print"
                            title="استمع إلى نطق عنوان الدرس والهدف التعليمي"
                          >
                            <Volume2 className={`w-5 h-5 ${speakingText?.includes(currentLesson.title) ? 'text-amber-300 animate-pulse' : ''}`} />
                          </button>
                        )}
                      </div>

                      {/* Learning Goal Strip */}
                      <div className={`mt-3 pt-2.5 border-t flex items-start gap-2 text-xs ${
                        isPrintFriendly ? 'border-slate-300 text-slate-800' : 'border-white/15 text-cyan-100'
                      }`}>
                        <Sparkles className={`w-4 h-4 shrink-0 mt-0.5 ${isPrintFriendly ? 'text-[#D97706]' : 'text-amber-300'}`} />
                        <div>
                          <span className={`font-bold uppercase tracking-wider text-[11px] ${isPrintFriendly ? 'text-slate-900' : 'text-white'}`}>
                            Learning Goal: 
                          </span>
                          <span> {currentLesson.student_book.learning_goal}</span>
                        </div>
                      </div>
                    </div>

                    {/* Section 1: Look, Listen and Say (Vocabulary / Phonics Card) */}
                    <div className={`rounded-2xl p-4 transition-colors avoid-break ${
                      isPrintFriendly
                        ? 'bg-white border-2 border-slate-300 shadow-none'
                        : 'bg-white border-2 border-[#0891B2]/30 shadow-sm hover:border-[#0891B2]'
                    }`}>
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
                        <div className="flex items-center gap-2">
                          <span className={`w-6 h-6 rounded-lg text-white flex items-center justify-center font-bold text-xs ${
                            isPrintFriendly ? 'bg-[#0A2540]' : 'bg-[#0891B2]'
                          }`}>
                            1
                          </span>
                          <h3 className="text-sm font-bold font-english text-[#0A2540]">
                            Look, listen and say
                          </h3>
                          <span className="text-xs font-arabic text-slate-500">
                            (انظر، واستمع، وردد)
                          </span>
                        </div>

                        {!isPrintFriendly && (
                          <button
                            onClick={() => handleSpeak(currentLesson.student_book.vocabulary.join('. '))}
                            className="p-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-[#0891B2] text-xs font-semibold flex items-center gap-1 transition no-print"
                            title="استمع إلى نطق الكلمات والمفردات"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span className="text-[11px]">نطق الكلمات</span>
                          </button>
                        )}
                      </div>

                      {/* Vocabulary Item Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                        {currentLesson.student_book.vocabulary.map((vocab, vIdx) => {
                          const words = vocab.split(/[;,•]/).map(w => w.trim()).filter(Boolean);
                          return words.map((w, wIdx) => (
                            <div 
                              key={`${vIdx}-${wIdx}`}
                              onClick={() => !isPrintFriendly && handleSpeak(w)}
                              className={`p-3 rounded-xl border flex items-center justify-between gap-2 transition-all ${
                                isPrintFriendly
                                  ? 'bg-white border-slate-300 text-black'
                                  : 'bg-gradient-to-br from-cyan-50/50 to-slate-50 border-cyan-100 hover:shadow-md hover:border-[#0891B2] cursor-pointer group'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                                  isPrintFriendly
                                    ? 'bg-slate-200 text-slate-800'
                                    : 'bg-[#0891B2]/10 text-[#0891B2] group-hover:bg-[#0891B2] group-hover:text-white'
                                }`}>
                                  {String.fromCharCode(65 + (wIdx % 26))}
                                </span>
                                <span className="font-bold font-english text-slate-900 text-sm">
                                  {w}
                                </span>
                              </div>
                              {!isPrintFriendly && (
                                <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-[#0891B2] transition-colors no-print" />
                              )}
                            </div>
                          ));
                        })}
                      </div>
                    </div>

                    {/* Section 2: Notice the Language / Model Dialogue / Grammar Focus */}
                    <div className={`rounded-2xl p-4 transition-colors avoid-break ${
                      isPrintFriendly
                        ? 'bg-white border-2 border-slate-300 shadow-none'
                        : 'bg-white border-2 border-[#D97706]/40 shadow-sm hover:border-[#D97706]'
                    }`}>
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
                        <div className="flex items-center gap-2">
                          <span className={`w-6 h-6 rounded-lg text-white flex items-center justify-center font-bold text-xs ${
                            isPrintFriendly ? 'bg-[#0A2540]' : 'bg-[#D97706]'
                          }`}>
                            2
                          </span>
                          <h3 className="text-sm font-bold font-english text-[#0A2540]">
                            {currentLesson.student_book.language_focus_title || 'Notice the language / Model'}
                          </h3>
                          <span className="text-xs font-arabic text-slate-500">
                            (لاحظ التركيب ونموذج اللغة)
                          </span>
                        </div>

                        {!isPrintFriendly && (
                          <button
                            onClick={() => handleSpeak(currentLesson.student_book.language_focus_content.join(' '))}
                            className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-[#D97706] text-xs font-semibold flex items-center gap-1 transition no-print"
                            title="استمع إلى قراءة النص أو الحوار كاملاً"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span className="text-[11px]">قراءة النموذج</span>
                          </button>
                        )}
                      </div>

                      {/* Dialogue or Grammar Formula Rendering */}
                      <div className="space-y-2">
                        {currentLesson.student_book.language_focus_content.map((content, cIdx) => {
                          const isDialogue = content.includes(':') && (content.includes('Hussam') || content.includes('Ayman') || content.includes('A:') || content.includes('B:'));
                          
                          if (isDialogue) {
                            const lines = content.split(/(?=[A-Za-z]+:)/).filter(Boolean);
                            return (
                              <div key={cIdx} className="space-y-2.5 my-1">
                                {lines.map((line, lIdx) => {
                                  const parts = line.split(':');
                                  const speaker = parts[0]?.trim();
                                  const speech = parts.slice(1).join(':').trim();
                                  const isHussam = speaker.toLowerCase().includes('hussam') || speaker === 'A';
                                  
                                  return (
                                    <div
                                      key={lIdx}
                                      onClick={() => !isPrintFriendly && handleSpeak(`${speaker} says: ${speech}`)}
                                      className={`flex items-start gap-3 p-3 rounded-2xl transition-all ${
                                        isPrintFriendly
                                          ? 'bg-slate-50 border border-slate-300'
                                          : isHussam
                                            ? 'bg-[#E0F2FE]/70 border border-[#BAE6FD] mr-4 cursor-pointer hover:scale-[1.01]'
                                            : 'bg-amber-50/70 border border-amber-200 ml-4 cursor-pointer hover:scale-[1.01]'
                                      }`}
                                    >
                                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white shrink-0 ${
                                        isPrintFriendly
                                          ? 'bg-slate-700'
                                          : isHussam ? 'bg-[#0891B2]' : 'bg-[#D97706]'
                                      }`}>
                                        {speaker.charAt(0)}
                                      </div>
                                      <div className="flex-1">
                                        <p className="text-[11px] font-bold text-slate-600 font-english mb-0.5">
                                          {speaker}
                                        </p>
                                        <p className="text-sm font-semibold text-slate-950 font-english leading-relaxed">
                                          {speech}
                                        </p>
                                      </div>
                                      {!isPrintFriendly && (
                                        <Volume2 className="w-3.5 h-3.5 text-slate-400 mt-1 shrink-0 no-print" />
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          }

                          // Regular grammar focus or reading box
                          return (
                            <div 
                              key={cIdx} 
                              onClick={() => !isPrintFriendly && handleSpeak(content)}
                              className={`p-4 rounded-xl font-english text-sm font-semibold text-slate-900 leading-relaxed ${
                                isPrintFriendly
                                  ? 'bg-white border-2 border-slate-300'
                                  : 'bg-gradient-to-r from-amber-50/60 via-white to-amber-50/30 border border-amber-200/80 cursor-pointer hover:border-[#D97706]'
                              }`}
                            >
                              <p className="whitespace-pre-line">{content}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Section 3: Practise (Interactive / Printable Exercises) */}
                    <div className={`rounded-2xl p-4 transition-colors avoid-break ${
                      isPrintFriendly
                        ? 'bg-white border-2 border-slate-300 shadow-none'
                        : 'bg-white border-2 border-slate-200 shadow-sm hover:border-slate-300'
                    }`}>
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-[#0A2540] text-white flex items-center justify-center font-bold text-xs">
                            3
                          </span>
                          <h3 className="text-sm font-bold font-english text-[#0A2540]">
                            Practise
                          </h3>
                          <span className="text-xs font-arabic text-slate-500">
                            (تدرّب وحل التمارين)
                          </span>
                        </div>

                        <span className="text-[11px] font-mono text-slate-500 font-bold">
                          {currentLesson.student_book.practise_items.length} Tasks
                        </span>
                      </div>

                      <div className="space-y-3">
                        {currentLesson.student_book.practise_items.map((item, pIdx) => (
                          <div 
                            key={pIdx}
                            className={`p-3 rounded-xl border flex flex-col gap-2 ${
                              isPrintFriendly
                                ? 'bg-white border-slate-300'
                                : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100/70'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                                {pIdx + 1}
                              </span>
                              <div className="flex-1 font-english text-xs sm:text-sm text-slate-900 leading-relaxed font-semibold">
                                <p className="whitespace-pre-line">{item}</p>
                              </div>
                            </div>

                            {/* Print Write-in Guide Lines */}
                            {isPrintFriendly && (
                              <div className="pt-2 pr-8 space-y-1.5 opacity-60">
                                <div className="border-b border-dashed border-slate-400 h-4" />
                                <div className="border-b border-dashed border-slate-400 h-4" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Section 4 & 5: Use English + Self-Check (Dual Bottom Cards) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 avoid-break">
                      {/* 4. Use English */}
                      <div className={`rounded-2xl p-3.5 flex flex-col justify-between ${
                        isPrintFriendly
                          ? 'bg-white border-2 border-slate-300'
                          : 'bg-gradient-to-br from-teal-50/70 to-cyan-50/40 border-2 border-[#0891B2]/30'
                      }`}>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`w-5 h-5 rounded-lg text-white flex items-center justify-center font-bold text-[11px] ${
                              isPrintFriendly ? 'bg-[#0A2540]' : 'bg-[#0891B2]'
                            }`}>
                              4
                            </span>
                            <h4 className="text-xs font-bold font-english text-[#0A2540]">
                              Use English (تواصل ومحادثة)
                            </h4>
                          </div>
                          <p className="text-xs sm:text-sm font-english text-slate-900 font-medium leading-relaxed">
                            {currentLesson.student_book.use_english || 'Pair work: Speak with your classmate using the target words.'}
                          </p>

                          {isPrintFriendly && (
                            <div className="mt-3 pt-2 border-t border-dashed border-slate-300">
                              <span className="text-[10px] text-slate-500 font-arabic block mb-1">
                                ملاحظات المعلم وتقييم التواصل الشفهي:
                              </span>
                              <div className="border border-slate-300 rounded h-10 bg-slate-50/50" />
                            </div>
                          )}
                        </div>

                        {!isPrintFriendly && (
                          <button
                            onClick={() => handleSpeak(currentLesson.student_book.use_english)}
                            className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0891B2] hover:underline no-print"
                          >
                            <Volume2 className="w-3 h-3" />
                            <span>استمع للتعليمات</span>
                          </button>
                        )}
                      </div>

                      {/* 5. Self-Check Box & Teacher Grading */}
                      <div className={`rounded-2xl p-3.5 flex flex-col justify-between ${
                        isPrintFriendly
                          ? 'bg-white border-2 border-slate-300'
                          : 'bg-slate-50 border-2 border-slate-200'
                      }`}>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-xs font-bold font-english text-slate-800 flex items-center gap-1.5">
                              <CheckSquare className="w-4 h-4 text-emerald-600" />
                              <span>Self-Check & Progress</span>
                            </h4>
                            <span className="text-[10px] font-arabic text-slate-500 font-semibold">تقييم ذاتي</span>
                          </div>
                          <p className="text-xs text-slate-700 font-english mb-3">
                            {currentLesson.student_book.self_check || 'I can achieve this lesson goal:'}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-300 space-y-2">
                          <label 
                            onClick={toggleSelfCheck}
                            className="flex items-center gap-2 cursor-pointer text-xs font-bold font-english text-slate-900"
                          >
                            <input 
                              type="checkbox" 
                              checked={!!checkedAnswers[currentLesson.lesson_number]} 
                              onChange={() => {}}
                              className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500" 
                            />
                            <span>Yes, I can do this! (أتقنت الهدف)</span>
                          </label>

                          {isPrintFriendly && (
                            <div className="flex items-center justify-between pt-1 text-[11px] font-arabic text-slate-600">
                              <span>توقيع المعلم: ________________</span>
                              <span>الدرجة: [   / 10 ]</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Printable Footer Strip (School Identity & Academic Year) */}
                  <footer className="bg-slate-100/80 border-t border-slate-300 px-6 py-2.5 text-[11px] text-slate-600 flex flex-wrap items-center justify-between gap-2 font-english">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#0A2540]">Qaflah Basic Education School</span>
                      <span>•</span>
                      <span>Hada Region, Habban, Shabwah, Yemen</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                      <span>Grade {grade} Student Book</span>
                      <span>•</span>
                      <span>Academic Year 2027–2028</span>
                      <span>•</span>
                      <span className="font-bold text-[#0A2540]">Page {currentLesson.page}</span>
                    </div>
                  </footer>

                </article>
              )}

              {/* 2. TEACHER'S GUIDE SECTION */}
              {(viewMode === 'teacher' || (viewMode === 'split' && !isPrintFriendly)) && (
                <article aria-label="دليل تدريس المعلم" className="textbook-sheet bg-[#FCFBF8] rounded-3xl border-2 border-amber-300/80 shadow-xl overflow-hidden flex flex-col justify-between transition-all">
                  
                  {/* TG Header Bar */}
                  <header className="bg-[#0891B2] text-white px-6 py-3 border-b-4 border-[#0A2540] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#0A2540] text-yellow-300 flex items-center justify-center font-bold text-sm shadow">
                        TG
                      </div>
                      <div>
                        <p className="text-[11px] text-cyan-100 font-bold uppercase tracking-wider font-english">
                          TEACHER’S INSTRUCTIONAL GUIDE
                        </p>
                        <h4 className="text-sm font-bold font-arabic text-white">
                          دليل المعلم • الصف {grade === 7 ? 'السابع' : 'الثامن'} الأساسي
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-white/20 rounded-lg text-xs font-mono font-bold text-white border border-white/10">
                        Lesson {currentLesson.lesson_number} Plan
                      </span>
                      <span className="px-2.5 py-1 bg-[#D97706] text-white rounded-lg text-xs font-mono font-bold shadow-sm">
                        30 Min
                      </span>
                    </div>
                  </header>

                  {/* TG Body */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    
                    {/* Aim and Timing Card */}
                    <div className="bg-white rounded-2xl border-2 border-cyan-200 p-4 shadow-sm">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#0891B2] bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                            هدف الدرس / Lesson Aim
                          </span>
                          <h3 className="text-base font-bold font-arabic text-slate-900 mt-1 leading-snug">
                            {currentLesson.teacher_guide.aim || currentLesson.student_book.learning_goal}
                          </h3>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100 text-xs">
                        <div className="flex items-center gap-2 text-slate-700">
                          <Clock className="w-4 h-4 text-[#D97706] shrink-0" />
                          <div>
                            <span className="font-bold text-slate-900">الزمن / Routine: </span>
                            <span>{currentLesson.teacher_guide.timing || '30 دقيقة: 5 د مراجعة، 7 د نمذجة، 8 د تدريب، 6 د تواصل، 4 د تقويم'}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-slate-700">
                          <FileText className="w-4 h-4 text-[#0891B2] shrink-0" />
                          <div>
                            <span className="font-bold text-slate-900">الأدوات / Materials: </span>
                            <span>{currentLesson.teacher_guide.materials || 'بطاقات كلمات/حروف وسبورة ودفاتر (لا يلزم إنترنت)'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Teaching Procedures (خطوات التدريس) */}
                    <div className="bg-white rounded-2xl border-2 border-slate-200 p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#0A2540]" />
                          <h4 className="text-xs font-bold font-arabic text-[#0A2540]">
                            إجراءات وخطوات التدريس المقترحة للحصة
                          </h4>
                        </div>
                        <span className="text-[11px] text-[#0891B2] font-bold">5 مراحل متسلسلة</span>
                      </div>

                      {/* Step-by-step guidance */}
                      {currentLesson.teacher_guide.stages_table.length > 0 ? (
                        <div className="space-y-2">
                          {currentLesson.teacher_guide.stages_table.map((row, rIdx) => (
                            <div key={rIdx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-start gap-2.5">
                              <span className="font-bold text-[#0891B2] shrink-0 min-w-16">
                                {row[0]}
                              </span>
                              <span className="text-slate-800 leading-relaxed">
                                {row[1] || row[0]}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-2 text-xs text-slate-800 leading-relaxed font-arabic">
                          {currentLesson.teacher_guide.procedure.length > 0 ? (
                            currentLesson.teacher_guide.procedure.map((proc, prIdx) => (
                              <div key={prIdx} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                                <p>{proc}</p>
                              </div>
                            ))
                          ) : (
                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
                              <p><strong>1. التهيئة والمراجعة (5 دقائق):</strong> استرجاع سريع للمفردات أو الأصوات السابقة باستخدام البطاقات السريعة.</p>
                              <p><strong>2. نمذجة اللغة (7 دقائق):</strong> عرض نموذج كتاب الطالب وقراءة النموذج بصوت واضح وتكرار الطلاب جماعياً وفردياً.</p>
                              <p><strong>3. التدريب الموجه (8 دقائق):</strong> إشراك الطلاب في حل تمرين التدريب على السبورة والتحقق من الاستيعاب.</p>
                              <p><strong>4. التواصل والتطبيق الثنائي (6 دقائق):</strong> تفعيل مهمة Use English بالعمل الثنائي وتبادل الأدوار.</p>
                              <p><strong>5. التقويم الختامي (4 دقائق):</strong> تطبيق مربع Self-check والتحقق من تحقق الهدف التعليمي.</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Answers & Solution Guidance */}
                    {showAnswers && (
                      <div className="bg-emerald-50 rounded-2xl border-2 border-emerald-300 p-4 shadow-sm animate-fadeIn">
                        <div className="flex items-center gap-2 mb-2 text-emerald-900 font-bold text-xs">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          <span>مفاتيح الإجابات وحلول التمارين النموذجية (Answer Key)</span>
                        </div>
                        <div className="text-xs text-emerald-800 space-y-1.5 font-english leading-relaxed">
                          {currentLesson.teacher_guide.answers.length > 0 ? (
                            currentLesson.teacher_guide.answers.map((ans, aIdx) => (
                              <p key={aIdx} className="whitespace-pre-line">{ans}</p>
                            ))
                          ) : (
                            <p className="whitespace-pre-line">
                              Practice Tasks Answers: Check student spelling, letter tracing precision, and affirmative word order according to the lesson model.
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Differentiation & Support (الدعم والإثراء) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-blue-50/70 rounded-2xl border border-blue-200 p-3.5 text-xs text-slate-800">
                        <p className="font-bold text-[#0891B2] mb-1.5 flex items-center gap-1">
                          <HelpCircle className="w-3.5 h-3.5" />
                          <span>الدعم للمتعثرين / Remedial Support:</span>
                        </p>
                        <p className="leading-relaxed text-[11px] text-slate-700">
                          {currentLesson.teacher_guide.support_extension || 'استخدم بطاقات كلمات ورقية ورسوماً توضيحية. للمتعثرين قلل الخيارات واستخدم التكرار الشفهي المعزز.'}
                        </p>
                      </div>

                      <div className="bg-amber-50/70 rounded-2xl border border-amber-200 p-3.5 text-xs text-slate-800">
                        <p className="font-bold text-[#D97706] mb-1.5 flex items-center gap-1">
                          <Award className="w-3.5 h-3.5" />
                          <span>التقويم والمتابعة / Assessment:</span>
                        </p>
                        <p className="leading-relaxed text-[11px] text-slate-700">
                          {currentLesson.teacher_guide.quick_check || 'راقب صحة الاستجابة، النطق المستهدف، ومشاركة كل طالب في الأنشطة الثنائية والتقييم الذاتي.'}
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* TG Footer */}
                  <footer className="bg-amber-50/60 border-t border-amber-200 px-6 py-2.5 text-[11px] text-slate-600 flex items-center justify-between font-arabic">
                    <span>دليل معلم اللغة الإنجليزية • مدرسة قفلة الأساسية</span>
                    <span className="font-mono text-xs font-bold text-[#0891B2]">Lesson {currentLesson.lesson_number} Teaching Notes</span>
                  </footer>

                </article>
              )}

            </div>
          )}

        </div>

      </div>

      {/* Interactive PDF Preview Modal */}
      <PDFPreviewModal
        book={previewPDFModal}
        isOpen={!!previewPDFModal}
        onClose={() => setPreviewPDFModal(null)}
      />
    </div>
  );
};
