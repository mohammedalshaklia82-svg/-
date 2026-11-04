import React, { useState } from 'react';
import { 
  BookOpen, Download, FileText, Image as ImageIcon, Eye, Printer, 
  CheckCircle, ArrowLeft, Layers, ShieldCheck, Sparkles, ExternalLink,
  BookMarked, School, ChevronRight
} from 'lucide-react';
import { DELIVERABLES_LIST } from '../data/deliverables';
import { PDFPreviewModal, PDFBookPreview } from './PDFPreviewModal';

interface BooksLibraryProps {
  onOpenBook: (grade: 7 | 8, mode: 'student' | 'teacher', lessonNum?: number) => void;
  onPrint: () => void;
}

export const BooksLibrary: React.FC<BooksLibraryProps> = ({ onOpenBook, onPrint }) => {
  const [selectedCoverModal, setSelectedCoverModal] = useState<string | null>(null);
  const [previewBookModal, setPreviewBookModal] = useState<PDFBookPreview | null>(null);

  const booksData = [
    {
      id: 'g7-sb',
      grade: 7 as const,
      mode: 'student' as const,
      title_ar: 'كتاب الطالب — الصف السابع الأساسي',
      title_en: 'Grade 7 Student Book (Full Redesigned Edition)',
      pdf_pages: 94,
      total_lessons: 90,
      total_units: 15,
      cover_image: '/covers/cover_grade7_student_book.png',
      pdf_url: '/downloads/Qaflah_Grade7_Student_Book_HADA_REDESIGNED.pdf',
      docx_url: '/downloads/Qaflah_Grade7_Student_Book_HADA_REDESIGNED.docx',
      cover_url: '/covers/cover_grade7_student_book.png',
      pdf_size: '2.18 MB',
      docx_size: '665 KB',
      color: 'from-[#0A2540] to-[#0891B2]',
      accent_badge: 'bg-[#0891B2]',
      desc_ar: 'النسخة الكاملة 94 صفحة للدروس 1 إلى 90، تبدأ بتأسيس الحروف والأصوات الأبجدية، ثم الصوتيات المبكرة والكلمات ثلاثية الحروف، والتراكيب البسيطة والتعبير عن النفس واليوميات والأسرة.',
      features: ['90 درساً كاملاً بدون أي حذف', 'تصميم عصري متوازن من أعلى لأسفل', 'بطاقات الحروف والصوتيات الملونة', 'تمارين تفاعلية ومربعات Self-Check']
    },
    {
      id: 'g7-tg',
      grade: 7 as const,
      mode: 'teacher' as const,
      title_ar: 'دليل المعلم — الصف السابع الأساسي',
      title_en: "Grade 7 Teacher's Guide (Bilingual Instructional Edition)",
      pdf_pages: 70,
      total_lessons: 90,
      total_units: 15,
      cover_image: '/covers/cover_grade7_teachers_guide.png',
      pdf_url: '/downloads/Qaflah_Grade7_Teacher_Guide_HADA_REDESIGNED.pdf',
      docx_url: '/downloads/Qaflah_Grade7_Teacher_Guide_HADA_REDESIGNED.docx',
      cover_url: '/covers/cover_grade7_teachers_guide.png',
      pdf_size: '2.44 MB',
      docx_size: '674 KB',
      color: 'from-[#0891B2] to-[#0D3B66]',
      accent_badge: 'bg-[#0A2540]',
      desc_ar: 'الدليل التربوي الشامل ثنائي اللغة (عربي/إنجليزي) 70 صفحة، يشتمل على روتين الحصة (30 دقيقة)، وإجراءات التدريس المفصلة، ومفاتيح الإجابات، وخطط تمايز المتعثرين وإثراء المتقدمين.',
      features: ['روتين زمني محدد بدقة (30 دقيقة)', 'أهداف ونواتج تعلم واضحة لكل درس', 'استراتيجيات الدعم والتمايز العلاجي', 'مفاتيح الحلول والإجابات النموذجية']
    },
    {
      id: 'g8-sb',
      grade: 8 as const,
      mode: 'student' as const,
      title_ar: 'كتاب الطالب — الصف الثامن الأساسي',
      title_en: 'Grade 8 Student Book (Full Redesigned Edition)',
      pdf_pages: 94,
      total_lessons: 90,
      total_units: 15,
      cover_image: '/covers/cover_grade8_student_book.png',
      pdf_url: '/downloads/Qaflah_Grade8_Student_Book_HADA_REDESIGNED.pdf',
      docx_url: '/downloads/Qaflah_Grade8_Student_Book_HADA_REDESIGNED.docx',
      cover_url: '/covers/cover_grade8_student_book.png',
      pdf_size: '2.30 MB',
      docx_size: '747 KB',
      color: 'from-[#0A2540] to-[#D97706]',
      accent_badge: 'bg-[#D97706]',
      desc_ar: 'الكتاب المدرسي المتكامل 94 صفحة، يضم حوارات واقعية لطلاب مدرسة قفلة بشبوة (حسام وأيمن)، والقواعد، والروتين اليومي، والأطعمة، والصحة، والمدن والاتجاهات، ومشاريع البورتفوليو.',
      features: ['حوارات طلاب مدرسة قفلة بشبوة', 'فقاعات كلام وشخصيات واضحة الأدوار', 'قواعد Grammar Focus بمخططات بصرية', 'مشاريع البورتفوليو والاختبار النهائي']
    },
    {
      id: 'g8-tg',
      grade: 8 as const,
      mode: 'teacher' as const,
      title_ar: 'دليل المعلم — الصف الثامن الأساسي',
      title_en: "Grade 8 Teacher's Guide (Bilingual Instructional Edition)",
      pdf_pages: 69,
      total_lessons: 90,
      total_units: 15,
      cover_image: '/covers/cover_grade8_teachers_guide.png',
      pdf_url: '/downloads/Qaflah_Grade8_Teacher_Guide_HADA_REDESIGNED.pdf',
      docx_url: '/downloads/Qaflah_Grade8_Teacher_Guide_HADA_REDESIGNED.docx',
      cover_url: '/covers/cover_grade8_teachers_guide.png',
      pdf_size: '2.50 MB',
      docx_size: '645 KB',
      color: 'from-[#D97706] to-[#0A2540]',
      accent_badge: 'bg-[#D97706]',
      desc_ar: 'دليل المعلم للصف الثامن 69 صفحة مع معايير تقييم التحدث والكتابة (Speaking & Writing Rubrics)، وتوجيهات توظيف الحوارات في الفصل، وإرشادات تقويم أوراق الاختبار النهائي من 50 درجة.',
      features: ['سلم تصحيح الكتابة والتحدث (Rubrics)', 'إرشادات الاختبار النهائي الشامل (50 درجة)', 'مفاتيح الإجابات لجميع التمارين', 'خطط الدروس التفاعلية الـ 90 كاملة']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* Hero Showcase Banner */}
      <div className="bg-gradient-to-r from-[#0A2540] via-[#0c3154] to-[#0891B2] rounded-3xl p-6 sm:p-8 text-white shadow-xl border-2 border-[#D97706]/40 relative overflow-hidden">
        <div className="absolute left-0 bottom-0 w-80 h-80 bg-white/5 rounded-full -translate-x-20 translate-y-20 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D97706] text-white rounded-full text-xs font-bold uppercase tracking-wider shadow">
              <Sparkles className="w-3.5 h-3.5" />
              <span>الكتب الأربعة المعتمدة مع الأغلفة الأصلية (327 صفحة كاملة)</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black font-arabic text-white leading-tight">
              مكتبة المناهج التعليمية الكاملة لمدرسة قفلة الأساسية (2027–2028)
            </h2>

            <p className="text-sm text-cyan-100 font-arabic leading-relaxed">
              جميع الكتب الأربعة معروضة بأغلفتها الأصلية المعتمدة وتصاميمها الداخلية الاحترافية العالمية الجاهزة للطباعة فوراً والتعديل بصيغتي PDF و Word DOCX، متضمنةً كل الدروس من 1 إلى 90 دون أي نقصان.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-lg text-emerald-300">
                <CheckCircle className="w-4 h-4" />
                كتاب الطالب سابع (94 صفحة)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-lg text-emerald-300">
                <CheckCircle className="w-4 h-4" />
                دليل المعلم سابع (70 صفحة)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-lg text-emerald-300">
                <CheckCircle className="w-4 h-4" />
                كتاب الطالب ثامن (94 صفحة)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-lg text-emerald-300">
                <CheckCircle className="w-4 h-4" />
                دليل المعلم ثامن (69 صفحة)
              </span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col gap-2">
            <a
              href="/downloads/Qaflah_Hada_Region_Redesigned_Package_2027_2028.zip"
              download
              className="px-6 py-3.5 bg-gradient-to-r from-[#D97706] to-[#F59E0B] hover:brightness-110 text-white rounded-2xl text-sm font-bold shadow-lg shadow-amber-900/40 flex items-center gap-3 transition-transform active:scale-95 text-center"
            >
              <Download className="w-5 h-5" />
              <div>
                <p className="font-black text-sm">تنزيل الحقيبة الكاملة (ZIP)</p>
                <p className="text-[10px] font-mono opacity-80">10.13 MB • كل الكتب والأغلفة</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* The 4 Books Main Showcase Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {booksData.map((book, idx) => (
          <div
            key={book.id}
            className="bg-white rounded-3xl border-2 border-slate-200/90 hover:border-[#0891B2] transition-all shadow-md hover:shadow-xl overflow-hidden flex flex-col justify-between group"
          >
            <div>
              {/* Card Header & Cover Image Showcase */}
              <div className="relative bg-slate-900 overflow-hidden flex items-center justify-center p-4">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                
                {/* Book Cover Image with Realistic Shadow */}
                <div className="relative z-20 max-w-[240px] w-full rounded-2xl shadow-2xl overflow-hidden border-2 border-white/20 transform group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={book.cover_image}
                    alt={book.title_ar}
                    className="w-full h-auto object-cover"
                  />
                  <button
                    onClick={() => setSelectedCoverModal(book.cover_image)}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-bold"
                  >
                    <Eye className="w-4 h-4 text-white" />
                    <span>تكبير الغلاف الأصلي</span>
                  </button>
                </div>

                {/* Top Badges */}
                <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-md font-mono ${book.accent_badge}`}>
                    {book.pdf_pages} صفحة PDF
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0A2540] text-yellow-300 border border-yellow-500/30 shadow-md font-mono">
                    {book.total_lessons} درساً
                  </span>
                </div>
              </div>

              {/* Book Info Body */}
              <div className="p-6 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono">
                      الصف {book.grade} • {book.mode === 'student' ? 'كتاب الطالب' : 'دليل المعلم'}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                      معتمد 2027–2028
                    </span>
                  </div>

                  <h3 className="text-xl font-black font-arabic text-slate-900 group-hover:text-[#0891B2] transition-colors leading-tight">
                    {book.title_ar}
                  </h3>
                  <p className="text-xs font-english text-slate-500 mt-1 font-semibold">
                    {book.title_en}
                  </p>
                </div>

                <p className="text-xs text-slate-600 font-arabic leading-relaxed">
                  {book.desc_ar}
                </p>

                {/* Features checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  {book.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700 font-arabic">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons: Open & Download Directly */}
            <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-3">
              {/* Primary Action: Read Book */}
              <button
                onClick={() => onOpenBook(book.grade, book.mode, 1)}
                className="w-full py-3 px-4 rounded-xl bg-[#0A2540] hover:bg-[#133659] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 group-hover:bg-[#0891B2]"
              >
                <BookOpen className="w-4 h-4 text-cyan-300" />
                <span>فتح وتصفح الكتاب كاملاً (الدروس 1–90)</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              {/* Direct Download Buttons Grid */}
              <div className="grid grid-cols-3 gap-2">
                {/* PDF Preview & Download Button */}
                <button
                  onClick={() => setPreviewBookModal(book)}
                  className="py-2.5 px-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-[11px] font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm text-center active:scale-95"
                  title={`معاينة وتحميل نسخة الطباعة PDF (${book.pdf_size})`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>معاينة وتحميل PDF</span>
                </button>

                {/* DOCX Download Button */}
                <a
                  href={book.docx_url}
                  download
                  className="py-2.5 px-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[11px] font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm text-center"
                  title={`تنزيل نسخة وورد قابلة للتعديل DOCX (${book.docx_size})`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>تنزيل Word</span>
                </a>

                {/* Cover PNG Download Button */}
                <a
                  href={book.cover_url}
                  download
                  className="py-2.5 px-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-[11px] font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm text-center"
                  title="تنزيل الغلاف الأصلي بدقة عالية PNG"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>تنزيل الغلاف</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Cover Artwork Modal Preview */}
      {selectedCoverModal && (
        <div
          onClick={() => setSelectedCoverModal(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md p-4 flex items-center justify-center cursor-pointer animate-fadeIn"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="max-w-xl w-full bg-white rounded-3xl p-4 shadow-2xl relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-inner border border-slate-200">
              <img
                src={selectedCoverModal}
                alt="Original Cover Preview"
                className="w-full max-h-[80vh] object-contain mx-auto"
              />
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 px-2">
              <div>
                <p className="text-xs font-bold font-arabic text-slate-900">
                  الغلاف الأصلي المعتمد لمدرسة قفلة الأساسية
                </p>
                <p className="text-[11px] text-slate-500 font-english font-medium">
                  Hada Region, Habban, Shabwah, Yemen • 2027–2028
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={selectedCoverModal}
                  download
                  className="px-3.5 py-1.5 bg-[#0A2540] hover:bg-[#133659] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>تحميل PNG</span>
                </a>

                <button
                  onClick={() => setSelectedCoverModal(null)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive PDF Preview Modal with Integrated Download Now Button */}
      <PDFPreviewModal
        book={previewBookModal}
        isOpen={!!previewBookModal}
        onClose={() => setPreviewBookModal(null)}
        onOpenInReader={onOpenBook}
      />
    </div>
  );
};
