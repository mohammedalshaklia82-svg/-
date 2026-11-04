import React, { useState, useEffect } from 'react';
import { 
  Download, FileText, X, CheckCircle, Eye, Printer, 
  ExternalLink, Sparkles, School, BookOpen, Layers, 
  Maximize2, Share2, HelpCircle, AlertCircle, FileCheck
} from 'lucide-react';

export interface PDFBookPreview {
  title_ar: string;
  title_en: string;
  grade: 7 | 8;
  mode: 'student' | 'teacher';
  pdf_url: string;
  docx_url?: string;
  cover_url: string;
  pdf_pages: number;
  pdf_size: string;
  docx_size?: string;
  desc_ar?: string;
}

interface PDFPreviewModalProps {
  book: PDFBookPreview | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenInReader?: (grade: 7 | 8, mode: 'student' | 'teacher') => void;
}

export const PDFPreviewModal: React.FC<PDFPreviewModalProps> = ({
  book,
  isOpen,
  onClose,
  onOpenInReader
}) => {
  const [activeTab, setActiveTab] = useState<'pdf' | 'overview'>('pdf');
  const [iframeError, setIframeError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(15);
  const [loadingStage, setLoadingStage] = useState('بدء تهيئة محرك العرض...');

  // Reset and drive loading progress when modal opens or book changes
  useEffect(() => {
    if (!isOpen || !book) return;

    setIsLoading(true);
    setProgress(15);
    setIframeError(false);
    setLoadingStage('استدعاء حزمة المستند المعتمد من الخادم...');

    const stages = [
      { p: 35, text: `فهرسة ${book.pdf_pages} صفحة وتجهيز الهوية البصرية...`, delay: 300 },
      { p: 60, text: 'معالجة الخطوط والرسوم التعليمية المتوافقة مع معايير كامبريدج...', delay: 700 },
      { p: 82, text: `تجهيز دقة الطباعة الأصلية (${book.pdf_size})...`, delay: 1200 },
      { p: 92, text: 'عرض مستند PDF داخل نافذة المعاينة التفاعلية...', delay: 1800 },
    ];

    const timers = stages.map(stage => 
      setTimeout(() => {
        setProgress(stage.p);
        setLoadingStage(stage.text);
      }, stage.delay)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isOpen, book?.pdf_url]);

  // Handle iframe finished loading
  const handleIframeLoad = () => {
    setProgress(100);
    setLoadingStage('اكتمل تجهيز المعاينة بنجاح!');
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !book) return null;

  const isStudent = book.mode === 'student';

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fadeIn no-print"
      onClick={onClose}
      dir="rtl"
    >
      <div 
        className="bg-white w-full max-w-5xl h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border-2 border-slate-300 transition-all"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0A2540] text-white px-5 sm:px-7 py-4 border-b-4 border-[#D97706] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#0891B2] flex items-center justify-center font-bold text-white text-sm shadow-md shrink-0">
              {book.grade}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#D97706] text-white font-mono uppercase">
                  الصف {book.grade} • {isStudent ? 'كتاب الطالب' : 'دليل المعلم'}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-cyan-200 font-mono">
                  {book.pdf_pages} صفحة PDF
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                  {book.pdf_size}
                </span>
                {isLoading && activeTab === 'pdf' && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono animate-pulse flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                    جارٍ المعالجة {progress}%
                  </span>
                )}
              </div>
              <h3 className="text-base sm:text-lg font-bold font-arabic text-white truncate mt-0.5">
                معاينة وتحميل: {book.title_ar}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* View Mode Switcher inside modal */}
            <div className="hidden sm:flex items-center bg-white/10 p-1 rounded-xl text-xs font-bold border border-white/15">
              <button
                onClick={() => setActiveTab('pdf')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'pdf' ? 'bg-[#0891B2] text-white shadow' : 'text-slate-300 hover:text-white'
                }`}
              >
                مستند PDF المعتمد
              </button>
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'overview' ? 'bg-[#0891B2] text-white shadow' : 'text-slate-300 hover:text-white'
                }`}
              >
                الغلاف والمواصفات
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition"
              title="إغلاق المعاينة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Viewer Area */}
        <div className="flex-1 bg-slate-100 relative overflow-hidden flex flex-col">
          {activeTab === 'pdf' ? (
            <div className="w-full h-full relative flex flex-col">
              {/* PDF Viewer Iframe */}
              <iframe
                src={`${book.pdf_url}#toolbar=1&navpanes=1&scrollbar=1`}
                title={book.title_en}
                className={`w-full h-full border-0 bg-slate-200 transition-opacity duration-500 ${
                  isLoading ? 'opacity-0' : 'opacity-100'
                }`}
                onLoad={handleIframeLoad}
                onError={() => {
                  setIframeError(true);
                  setIsLoading(false);
                }}
              />

              {/* Enhanced Loading State Overlay with Progress Bar */}
              {isLoading && (
                <div className="absolute inset-0 z-20 bg-slate-900/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center text-white transition-opacity duration-300">
                  <div className="max-w-md w-full bg-slate-800/90 border border-white/15 p-7 rounded-3xl shadow-2xl space-y-5">
                    {/* Animated Icon & Badge */}
                    <div className="relative mx-auto w-16 h-16 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-2xl bg-[#0891B2]/30 animate-ping"></div>
                      <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0891B2] to-[#0A2540] flex items-center justify-center shadow-lg border border-cyan-400/30">
                        <FileText className="w-8 h-8 text-cyan-200 animate-pulse" />
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#D97706]/20 text-[#D97706] border border-[#D97706]/40 uppercase tracking-wider font-mono">
                        مدرسة قفلة الأساسية • 2027–2028
                      </span>
                      <h4 className="text-base sm:text-lg font-bold font-arabic text-white mt-2">
                        جارٍ إعداد وتجهيز مستند PDF
                      </h4>
                      <p className="text-xs text-slate-300 font-arabic mt-1">
                        {book.title_ar} ({book.pdf_pages} صفحة بدقة الطباعة المعتمدة)
                      </p>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono px-1">
                        <span className="text-cyan-300 font-bold font-arabic">{loadingStage}</span>
                        <span className="text-white font-extrabold">{progress}%</span>
                      </div>

                      {/* Bar track */}
                      <div className="w-full h-3 bg-slate-700/80 rounded-full overflow-hidden p-0.5 border border-slate-600">
                        <div 
                          className="h-full bg-gradient-to-r from-[#0891B2] via-cyan-400 to-[#D97706] rounded-full transition-all duration-300 shadow-sm relative"
                          style={{ width: `${progress}%` }}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-arabic px-1 pt-0.5">
                        <span>حجم الملف: {book.pdf_size}</span>
                        <span>معايير Cambridge & Oxford</span>
                      </div>
                    </div>

                    {/* Fast-path download hint */}
                    <div className="pt-2 border-t border-white/10 flex flex-col items-center gap-2">
                      <p className="text-[11px] text-slate-400 font-arabic">
                        هل ترغب في الحصول على الملف فوراً دون انتظار استعراض الصفحات؟
                      </p>
                      <a
                        href={book.pdf_url}
                        download
                        className="px-4 py-2 bg-[#D97706] hover:bg-amber-600 text-white rounded-xl text-xs font-bold font-arabic transition shadow flex items-center gap-2"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>تحميل الملف مباشرة الآن ({book.pdf_size})</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Fallback if Iframe fails */}
              {iframeError && (
                <div className="absolute inset-0 z-10 bg-slate-100 flex flex-col items-center justify-center p-6 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold font-arabic text-slate-800">
                      تعذر فتح المستند داخل المتصفح تلقائياً
                    </h4>
                    <p className="text-xs text-slate-500 font-arabic max-w-md mt-1">
                      يدعم متصفحك التحميل المباشر للملفات ذات الحجم الكبير أو فتحها في نافذة مستقلة.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={book.pdf_url}
                      download
                      className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow"
                    >
                      <Download className="w-4 h-4" />
                      <span>تنزيل ملف PDF ({book.pdf_size})</span>
                    </a>
                    <a
                      href={book.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5"
                    >
                      <span>فتح في نافذة جديدة</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}

              {/* Informational overlay notice at bottom */}
              <div className="bg-slate-900/90 text-white px-4 py-2 text-xs flex items-center justify-between gap-3 shrink-0 backdrop-blur-sm border-t border-white/10">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-arabic text-[11px] text-slate-200">
                    هذه المعاينة التفاعلية تعرض الملف الأصلي المعتمد ({book.pdf_pages} صفحة) بدقة الطباعة الكاملة.
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={book.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-cyan-300 hover:text-white font-bold flex items-center gap-1"
                  >
                    <span>فتح في تبويب جديد</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ) : (
            /* Overview Tab: Cover Artwork & Specifications */
            <div className="w-full h-full overflow-y-auto p-6 flex flex-col items-center justify-between text-center bg-white space-y-6">
              <div className="max-w-md w-full mx-auto">
                <div className="rounded-2xl shadow-2xl overflow-hidden border-4 border-[#0A2540] relative group">
                  <img
                    src={book.cover_url}
                    alt={book.title_ar}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                    <span className="text-xs font-bold text-white bg-black/60 px-3 py-1 rounded-full font-mono">
                      الغلاف الأصلي المعتمد بدقة عالية
                    </span>
                  </div>
                </div>

                <h4 className="text-lg font-black font-arabic text-slate-900 mt-4">
                  {book.title_ar}
                </h4>
                <p className="text-xs font-english text-slate-500 font-semibold">
                  {book.title_en}
                </p>
                <p className="text-xs text-slate-600 font-arabic mt-2 leading-relaxed">
                  {book.desc_ar || 'تم إخراج هذا الكتاب بالكامل وفق معايير النشر الدولي Modern International Educational Textbook Design لمدرسة قفلة الأساسية للعام الدراسي 2027–2028.'}
                </p>
              </div>

              {/* Technical Spec Chips */}
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl text-xs font-arabic text-slate-700">
                <span className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <strong>عدد الدروس:</strong> 90 درساً متكاملاً
                </span>
                <span className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <strong>عدد الوحدات:</strong> 15 وحدة دراسية
                </span>
                <span className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <strong>عدد الصفحات:</strong> {book.pdf_pages} صفحة PDF
                </span>
                <span className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <strong>المستوى:</strong> A1+ → A2 Bridge
                </span>
                <span className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <strong>الموقع:</strong> Hada Region, Habban, Shabwah, Yemen
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer: The Prominent Integrated "Download Now" Action Bar */}
        <div className="bg-slate-50 px-5 sm:px-7 py-3.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs font-arabic text-slate-600">
            <span className="font-bold text-[#0A2540]">جاهز للتحميل والطباعة:</span>
            <span className="text-slate-500">حجم ملف PDF: {book.pdf_size}</span>
            {book.docx_size && <span className="text-slate-400">• Word: {book.docx_size}</span>}
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Primary Action Button: DOWNLOAD NOW */}
            <a
              href={book.pdf_url}
              download
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>تنزيل الآن PDF ({book.pdf_size})</span>
            </a>

            {/* Word DOCX Download */}
            {book.docx_url && (
              <a
                href={book.docx_url}
                download
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 active:scale-95"
              >
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">تنزيل نسخة Word</span>
                <span className="sm:hidden">Word</span>
              </a>
            )}

            {/* Cover PNG Download */}
            <a
              href={book.cover_url}
              download
              className="px-3 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 active:scale-95"
              title="تنزيل الغلاف الأصلي PNG"
            >
              <span className="text-xs">تنزيل الغلاف</span>
            </a>

            {/* Reader jump */}
            {onOpenInReader && (
              <button
                onClick={() => {
                  onOpenInReader(book.grade, book.mode);
                  onClose();
                }}
                className="px-3.5 py-2.5 bg-[#0A2540] hover:bg-[#133659] text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
              >
                <BookOpen className="w-4 h-4 text-cyan-300" />
                <span className="hidden md:inline">فتح في القارئ التفاعلي</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
