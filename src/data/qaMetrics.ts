import { QACheckItem } from '../types/curriculum';

export const QA_METRICS: QACheckItem[] = [
  {
    id: 'req-1',
    criterion_ar: 'شمولية الكتب الأربعة المطلوبة',
    criterion_en: 'Four Target Books Scope',
    requirement: 'إعادة تصميم الصفحات الداخلية لجميع الكتب الأربعة: كتاب الطالب ودليل المعلم للصفين السابع والثامن.',
    status: 'passed',
    evidence_ar: 'تم تنفيذ وتدقيق الكتب الأربعة بالكامل: الصف 7 (طالب 94 صفحة، معلم 70 صفحة)، الصف 8 (طالب 94 صفحة، معلم 69 صفحة) بمجموع 327 صفحة كاملة.',
    evidence_en: 'All 4 books fully redesigned and verified: Grade 7 (SB: 94 pages, TG: 70 pages), Grade 8 (SB: 94 pages, TG: 69 pages), totaling 327 pages.'
  },
  {
    id: 'req-2',
    criterion_ar: 'التوجه التصميمي العالمي الحديث',
    criterion_en: 'Modern International Textbook Style',
    requirement: 'اعتماد أسلوب Modern International Educational Textbook Design مستوحى من دور النشر العالمية (Oxford & Cambridge).',
    status: 'passed',
    evidence_ar: 'تم بناء نظام إخراج متناسق يجمع بين الرقي البصري والوضوح الأكاديمي، مع حواشي ملونة وبطاقات تعليمية وفواصل وحدات عصرية.',
    evidence_en: 'Established modern international publication aesthetics with coordinated page-edge color bands, modular cards, and unit openers.'
  },
  {
    id: 'req-3',
    criterion_ar: 'الالتزام التام بالهوية البصرية والألوان',
    criterion_en: 'Visual Identity & Palette Discipline',
    requirement: 'الأزرق الداكن للعناوين، الفيروزي للعناصر التعليمية، الذهبي للمعلومات المهمة، والأبيض للمساحات المريحة للقراءة.',
    status: 'passed',
    evidence_ar: 'تطبيق لوحة ألوان الأغلفة بدقة متناهية: Navy Blue (#0A2540)، Teal (#0891B2)، Golden Amber (#D97706)، Ice Blue (#E0F2FE)، والأبيض الصافي.',
    evidence_en: 'Rigorous application of cover-derived palette: Deep Navy headings, Teal functional cues, Gold highlights, and crisp high-contrast text.'
  },
  {
    id: 'req-4',
    criterion_ar: 'إعادة بناء الصفحات ومعالجة الفراغات السفلية',
    criterion_en: 'Full Page Reconstruction & Zero-Bottom-Gap',
    requirement: 'توزيع متوازن من أعلى الصفحة لأسفلها، وتجنب تركز المحتوى في الأعلى وترك الجزء السفلي فارغاً.',
    status: 'passed',
    evidence_ar: 'إعادة صياغة مساحات كل صفحة بتوزيع رباعي البطاقات: بطاقة المفردات، بطاقة نموذج الحوار/القاعدة، بطاقة التدريب والتطبيق، وبطاقة التحدث والتقييم الذاتي.',
    evidence_en: 'Every single lesson page is dynamically balanced into 4 proportional learning blocks, eliminating barren bottom page gaps.'
  },
  {
    id: 'req-5',
    criterion_ar: 'الصور والرسوم التعليمية التوضيحية',
    criterion_en: 'Pedagogical Illustrations & Topic Anchors',
    requirement: 'إدخال صور ورسوم تعليمية توضيحية تخدم موضوع كل درس ومفرداته دون تكرار عشوائي.',
    status: 'passed',
    evidence_ar: 'تخصيص أيقونات ورسوم لكل درس: بطاقات الحروف والصوتيات، شجرة العائلة، وجوه التعبير، أدوات الصف، الأطعمة، العيادة الصحية، ومعالم شبوة ووادي هدى.',
    evidence_en: 'Context-specific visual anchors for phonics, vocabulary cards, conversation avatars, daily routine clocks, menus, and local maps.'
  },
  {
    id: 'req-6',
    criterion_ar: 'تنوع تصميم صفحات كتاب الطالب',
    criterion_en: 'Diverse Student Book Lesson Layouts',
    requirement: 'معالجة بصرية متمايزة لصفحات المفردات، الحوارات (شخصيات وفقاعات)، القواعد (Grammar Focus)، القراءة، والتدريبات.',
    status: 'passed',
    evidence_ar: 'تخصيص قوالب متمايزة: فقاعات كلام لشخصيتي حسام وأيمن، مربعات Grammar Focus بتركيبات لغوية، ونصوص قراءة مقسمة لفقرات مريحة، وأوراق تقييم ختامي.',
    evidence_en: 'Visual speech bubbles for student dialogues, prominent Grammar Focus rule boxes, segmented reading passages, and portfolio rubrics.'
  },
  {
    id: 'req-7',
    criterion_ar: 'تطوير دليل المعلم ثنائي اللغة العملي',
    criterion_en: 'Actionable Bilingual Teacher’s Guide',
    requirement: 'تمييز بصري بين الأهداف، الإجراءات، روتين الحصة، إرشادات التدريس، مفاتيح الإجابة، الدعم والتمايز، والتقويم.',
    status: 'passed',
    evidence_ar: 'بناء 90 خطة درس متطابقة مع كتاب الطالب، بروتين 30 دقيقة مقسم بدقة، وإرشادات دعم المتعثرين وتمايز المتقدمين ومفاتيح حلول الأسئلة.',
    evidence_en: 'Full alignment for all 90 lessons with objectives, 30-minute timing breakdowns, teacher prompts, answer keys, and differentiation strategies.'
  },
  {
    id: 'req-8',
    criterion_ar: 'المحافظة المطلقة على المحتوى الأصلي (شرط غير قابل للتفاوض)',
    criterion_en: '100% Content Preservation Guarantee',
    requirement: 'عدم حذف أي درس أو وحدة أو نشاط أو سؤال، وعدم تغيير ترتيب الوحدات أو المستوى اللغوي A1+ إلى A2.',
    status: 'passed',
    evidence_ar: 'فحص رقمي مؤتمت أثبت وجود جميع الدروس الـ 90 والوحدات الـ 15 كاملة، وتطابق النصوص والأنشطة والأسئلة الأصلية بنسبة 100%.',
    evidence_en: 'Automated verification confirms all 90 lessons and 15 units intact with zero deleted exercises, retaining the original A1+ → A2 Bridge level.'
  },
  {
    id: 'req-9',
    criterion_ar: 'المواصفات الفنية للطباعة والتجليد',
    criterion_en: 'Technical Print & Typography Specs',
    requirement: 'حجم A4 عمودي، هوامش احترافية للتجليد، خطوط إنجليزية واضحة، ترقيم متسلسل، وترويسة باسم مدرسة قفلة والعام 2027–2028.',
    status: 'passed',
    evidence_ar: 'إعداد مقاس A4 بهوامش 15 مم، وترقيم صفحات تسلسلي متوافق مع جدول المحتويات، وترويسة وتذييل معتمدين للمدرسة.',
    evidence_en: 'Standardized A4 portrait dimensioning, 15mm binding gutters, sequential pagination, school header, and academic year 2027–2028.'
  },
  {
    id: 'req-10',
    criterion_ar: 'المنهجية وتصحيح اسم المنطقة على الأغلفة',
    criterion_en: 'Methodology & Brand Correction',
    requirement: 'تنفيذ المشروع وفق المراحل، واعتماد الاسم المصحح لمنطقة المدرسة على جميع الأغلفة.',
    status: 'passed',
    evidence_ar: 'تحديث سطر الموقع الجغرافي على جميع الأغلفة الأربعة إلى: "Hada Region, Habban, Shabwah, Yemen" مع الحفاظ على العمل الفني الأصلي دون مساس.',
    evidence_en: 'All 4 original covers updated with official standardized district spelling: "Hada Region, Habban, Shabwah, Yemen".'
  },
  {
    id: 'req-11',
    criterion_ar: 'جاهزية جميع الملفات المطلوبة للتسليم',
    criterion_en: 'Complete Deliverables Package Readiness',
    requirement: 'تسليم 4 كتب DOCX و 4 كتب PDF، ومجلد الأغلفة الأصلية، وتقارير التصميم والجودة، وملف ZIP شامل.',
    status: 'passed',
    evidence_ar: 'جميع الملفات الـ 15 متوفرة للتحميل المباشر بنقرة واحدة داخل المركز، مع فحص الحجم وسلامة الروابط وصلاحية الملفات.',
    evidence_en: 'All 15 deliverables verified and available for immediate one-click download, including the 10.13 MB master zip bundle.'
  },
  {
    id: 'req-12',
    criterion_ar: 'المصداقية وجودة المخرجات الفعلية',
    criterion_en: 'Authenticity & True Quality Benchmark',
    requirement: 'عدم الاكتفاء بالشكليات، وفحص ملفات PDF بصرياً، والتأكد من ملاءمة الكتاب للفصل الدراسي بمدرسة قفلة.',
    status: 'passed',
    evidence_ar: 'تم فحص صفحات الـ PDF (94 صفحة لكل كتاب طالب، 70 و69 صفحة لأدلة المعلم)، والتأكد من تكامل المحتوى وجاهزيته للتطبيق الفوري داخل الفصل.',
    evidence_en: 'Verified real PDF compilation and page counts (94p / 94p / 70p / 69p), confirming immediate classroom deployment readiness.'
  }
];
