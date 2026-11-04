import React, { useState } from 'react';
import { 
  Download, FileText, CheckCircle2, Archive, Eye, 
  ExternalLink, Sparkles, BookOpen, UserCheck, ShieldCheck, 
  FileCheck, Copy, Check, Info, AlertCircle 
} from 'lucide-react';
import { DELIVERABLES_LIST } from '../data/deliverables';
import { DeliverableFile } from '../types/curriculum';
import { PDFPreviewModal, PDFBookPreview } from './PDFPreviewModal';

export const DownloadCenter: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | '7' | '8' | 'covers' | 'package'>('all');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewPDFModal, setPreviewPDFModal] = useState<PDFBookPreview | null>(null);

  const filteredFiles = DELIVERABLES_LIST.filter(item => {
    if (filterType === 'all') return true;
    if (filterType === '7') return item.grade === 7 && item.type !== 'Package ZIP';
    if (filterType === '8') return item.grade === 8 && item.type !== 'Package ZIP';
    if (filterType === 'covers') return item.type === 'Cover Artwork';
    if (filterType === 'package') return item.type === 'Package ZIP' || item.type === 'Report';
    return true;
  });

  const handleCopyLink = (file: DeliverableFile) => {
    const fullUrl = window.location.origin + file.download_url;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(file.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const masterZip = DELIVERABLES_LIST.find(d => d.id === 'master-zip')!;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero: Master Package ZIP */}
      <div className="bg-gradient-to-r from-[#0A2540] via-[#0D3B66] to-[#0891B2] rounded-3xl p-6 sm:p-8 text-white shadow-xl border-2 border-[#D97706]/40 relative overflow-hidden mb-10">
        <div className="absolute left-0 bottom-0 w-80 h-80 bg-white/5 rounded-full -translate-x-20 translate-y-20 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D97706] text-white rounded-full text-xs font-bold uppercase tracking-wider shadow">
              <Archive className="w-3.5 h-3.5" />
              <span>الحقيبة الشاملة المعتمدة للتسليم النهائي (Master Package)</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black font-arabic text-white leading-tight">
              حزمة مناهج مدرسة قفلة الأساسية الكاملة للعام 2027–2028
            </h2>

            <p className="text-sm text-cyan-100 font-arabic leading-relaxed">
              تحتوي هذه الحقيبة على جميع المخرجات الـ 15 المعتمدة: كتب الطالب وأدلة المعلم للصفين السابع والثامن بصيغتي DOCX و PDF الأصلية، ومجلد الأغلفة الأصلية المعدلة باسم المنطقة، وتقارير مراجعة التصميم والجودة.
            </p>

            {/* Checklist badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 rounded-lg text-xs font-semibold text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5" />
                4 كتب بصيغة DOCX قابلة للتحرير
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 rounded-lg text-xs font-semibold text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5" />
                4 كتب بصيغة PDF جاهزة للطباعة
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 rounded-lg text-xs font-semibold text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5" />
                4 أغلفة أصلية بدقة عالية
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 rounded-lg text-xs font-semibold text-amber-300">
                <CheckCircle2 className="w-3.5 h-3.5" />
                تقرير التصميم والجودة الكامل
              </span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col items-center gap-2">
            <a
              href={masterZip.download_url}
              download
              className="px-6 py-4 bg-gradient-to-r from-[#D97706] to-[#F59E0B] hover:brightness-110 text-white rounded-2xl text-sm font-black shadow-lg shadow-amber-900/40 flex items-center gap-3 transition-transform active:scale-95 text-center"
            >
              <Download className="w-5 h-5" />
              <div>
                <p className="text-base">تحميل الحقيبة الكاملة ZIP</p>
                <p className="text-[11px] font-mono opacity-80">الحجم: 10.13 MB • مباشر</p>
              </div>
            </a>

            <button
              onClick={() => setShowReportModal(true)}
              className="text-xs text-cyan-200 hover:text-white underline font-arabic font-semibold flex items-center gap-1 pt-1"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>قراءة تقرير التصميم والجودة (QA Report)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold font-arabic text-slate-900">
            جميع الملفات والمخرجات المعتمدة (15 ملفاً)
          </h3>
          <p className="text-xs text-slate-500 font-arabic">
            يمكنك تحميل كل ملف على حدة بصيغة Word أو PDF أو الصور الأصلية
          </p>
        </div>

        <div className="flex items-center bg-slate-200/80 p-1 rounded-xl text-xs font-bold font-arabic">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filterType === 'all' ? 'bg-white text-[#0A2540] shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            الكل (15)
          </button>
          <button
            onClick={() => setFilterType('7')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filterType === '7' ? 'bg-white text-[#0A2540] shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            الصف السابع (4)
          </button>
          <button
            onClick={() => setFilterType('8')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filterType === '8' ? 'bg-white text-[#0A2540] shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            الصف الثامن (4)
          </button>
          <button
            onClick={() => setFilterType('covers')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filterType === 'covers' ? 'bg-white text-[#0A2540] shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            الأغلفة الأصلية (4)
          </button>
          <button
            onClick={() => setFilterType('package')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filterType === 'package' ? 'bg-white text-[#0A2540] shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            الحقيبة والتقارير (3)
          </button>
        </div>
      </div>

      {/* Deliverables Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFiles.map(file => {
          const isDocx = file.format === 'DOCX';
          const isPdf = file.format === 'PDF';
          const isCover = file.format === 'PNG';
          const isZip = file.format === 'ZIP';

          return (
            <div
              key={file.id}
              className="bg-white rounded-2xl border-2 border-slate-200/80 hover:border-[#0891B2] transition-all shadow-sm hover:shadow-md flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Header & Preview Image */}
              <div>
                {/* Cover Thumbnail if image */}
                {isCover && (
                  <div 
                    onClick={() => setPreviewImage(file.download_url)}
                    className="h-44 bg-slate-900 relative cursor-pointer overflow-hidden flex items-center justify-center group-hover:brightness-105 transition"
                  >
                    <img 
                      src={file.download_url} 
                      alt={file.title_ar} 
                      className="w-full h-full object-cover object-top" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-bold">
                      <Eye className="w-4 h-4" />
                      <span>معاينة الغلاف بالحجم الكامل</span>
                    </div>
                  </div>
                )}

                <div className="p-5">
                  {/* Format & Grade Badge */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold font-mono tracking-wider text-white ${
                      isDocx ? 'bg-blue-600' :
                      isPdf ? 'bg-rose-600' :
                      isCover ? 'bg-purple-600' :
                      isZip ? 'bg-amber-600' : 'bg-slate-700'
                    }`}>
                      {file.format}
                    </span>

                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 font-mono">
                      {file.pages && (
                        <span className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-700">
                          {file.pages} صفحة
                        </span>
                      )}
                      <span className="text-[11px]">
                        {file.size_formatted}
                      </span>
                    </div>
                  </div>

                  {/* Title Arabic and English */}
                  <h4 className="text-sm font-bold font-arabic text-slate-900 group-hover:text-[#0891B2] transition-colors line-clamp-2 leading-snug">
                    {file.title_ar}
                  </h4>
                  <p className="text-[11px] font-english text-slate-500 mt-1 line-clamp-1 font-medium">
                    {file.title_en}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-slate-600 font-arabic mt-3 line-clamp-2 leading-relaxed">
                    {file.description_ar}
                  </p>
                </div>
              </div>

              {/* Card Footer: Action Buttons */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                {isPdf ? (
                  <button
                    onClick={() => {
                      setPreviewPDFModal({
                        title_ar: file.title_ar,
                        title_en: file.title_en,
                        grade: file.grade,
                        mode: file.type === "Teacher's Guide" ? "teacher" : "student",
                        pdf_url: file.download_url,
                        docx_url: file.download_url.replace('.pdf', '.docx'),
                        cover_url: file.cover_preview || (file.grade === 7 ? (file.type === "Teacher's Guide" ? '/covers/cover_grade7_teachers_guide.png' : '/covers/cover_grade7_student_book.png') : (file.type === "Teacher's Guide" ? '/covers/cover_grade8_teachers_guide.png' : '/covers/cover_grade8_student_book.png')),
                        pdf_pages: file.pages || (file.grade === 7 ? (file.type === "Teacher's Guide" ? 70 : 94) : (file.type === "Teacher's Guide" ? 69 : 94)),
                        pdf_size: file.size_formatted,
                        docx_size: file.grade === 7 ? (file.type === "Teacher's Guide" ? '674 KB' : '665 KB') : (file.type === "Teacher's Guide" ? '645 KB' : '747 KB'),
                        desc_ar: file.description_ar
                      });
                    }}
                    className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-white transition-all flex items-center justify-center gap-2 shadow-sm bg-rose-600 hover:bg-rose-700 active:scale-95"
                    title={`معاينة وتحميل ${file.title_ar}`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>معاينة وتحميل PDF</span>
                  </button>
                ) : (
                  <a
                    href={file.download_url}
                    download
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold text-white transition-all flex items-center justify-center gap-2 shadow-sm ${
                      isDocx ? 'bg-blue-600 hover:bg-blue-700' :
                      isZip ? 'bg-amber-600 hover:bg-amber-700' : 'bg-[#0A2540] hover:bg-[#133659]'
                    }`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>تحميل الملف</span>
                  </a>
                )}

                {isCover ? (
                  <button
                    onClick={() => setPreviewImage(file.download_url)}
                    className="p-2 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition"
                    title="تكبير الصورة"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleCopyLink(file)}
                    className="p-2 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition"
                    title="نسخ رابط التحميل المباشر"
                  >
                    {copiedId === file.id ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Cover Image Modal Preview */}
      {previewImage && (
        <div 
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 flex items-center justify-center cursor-pointer animate-fadeIn"
        >
          <div className="max-w-2xl max-h-[90vh] bg-white rounded-3xl p-3 shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <img 
              src={previewImage} 
              alt="Cover Artwork" 
              className="max-h-[80vh] w-auto rounded-2xl mx-auto object-contain" 
            />
            <div className="mt-3 flex items-center justify-between px-2">
              <span className="text-xs font-bold font-arabic text-slate-700">
                الغلاف الأصلي المعتمد لمدرسة قفلة الأساسية - وادي هدى - حبان - شبوة
              </span>
              <a 
                href={previewImage} 
                download 
                className="px-3 py-1 bg-[#0A2540] text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
              >
                <Download className="w-3 h-3" />
                <span>تحميل PNG</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Design and QA Report Modal */}
      {showReportModal && (
        <div 
          onClick={() => setShowReportModal(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 flex items-center justify-center cursor-pointer"
        >
          <div 
            onClick={e => e.stopPropagation()} 
            className="max-w-3xl w-full max-h-[85vh] bg-white rounded-3xl p-6 shadow-2xl overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[#0891B2]" />
                <h3 className="text-base font-bold font-arabic text-slate-900">
                  تقرير التصميم والجودة والاعتماد التربوي (DESIGN_AND_QA_REPORT.txt)
                </h3>
              </div>
              <button 
                onClick={() => setShowReportModal(false)}
                className="text-xs bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg text-slate-600 font-bold"
              >
                إغلاق
              </button>
            </div>

            <div className="bg-slate-900 text-slate-100 font-mono text-xs p-5 rounded-2xl leading-relaxed whitespace-pre-wrap">
{`QAFLAH BASIC EDUCATION SCHOOL
ENGLISH CURRICULUM • GRADES 7–8
DESIGN REVISION & EDITORIAL REVIEW
Academic Year 2027–2028

DELIVERABLES:
- Grade 7 Student Book (PDF: 94 pages + editable DOCX)
- Grade 7 Teacher's Guide (PDF: 70 pages + editable DOCX)
- Grade 8 Student Book (PDF: 94 pages + editable DOCX)
- Grade 8 Teacher's Guide (PDF: 69 pages + editable DOCX)
- Four matching cover artwork files (PNG)
- Combined master ZIP package

BRAND / LOCATION UPDATE:
All four redesigned covers now use:
"Hada Region, Habban, Shabwah, Yemen"
The former location spelling on the cover artwork has been replaced.

VISUAL SYSTEM:
- Navy blue, teal/cyan, gold, and white palette
- Large English title and clear grade / book-type hierarchy
- Consistent A1+ → A2 Bridge label
- School name and location line
- Coordinated academic-year footer
- Branded page-edge accents on interior PDF pages
- Matching cover inserted into each editable DOCX

STRUCTURAL REVIEW:
- Four source documents and four source PDFs were verified.
- Both student books include lesson sequence through Lesson 90.
- Both teacher guides include the early lesson-planning batches and explicit teaching notes through Lesson 90.
- Zero deleted units, lessons, or exercises.`}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <a
                href="/downloads/DESIGN_AND_QA_REPORT.txt"
                download
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0A2540] text-white rounded-xl text-xs font-bold"
              >
                <Download className="w-3.5 h-3.5" />
                <span>تحميل التقرير كملف TXT</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Interactive PDF Preview Modal */}
      <PDFPreviewModal
        book={previewPDFModal}
        isOpen={!!previewPDFModal}
        onClose={() => setPreviewPDFModal(null)}
      />
    </div>
  );
};
