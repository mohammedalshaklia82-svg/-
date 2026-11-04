export interface PaletteColor {
  name_en: string;
  name_ar: string;
  hex: string;
  role_en: string;
  role_ar: string;
  sample_classes: string;
  border_class: string;
}

export const COLOR_PALETTE: PaletteColor[] = [
  {
    name_en: 'Deep Navy Blue',
    name_ar: 'الأزرق البحري الداكن',
    hex: '#0A2540',
    role_en: 'Primary title color, page headers, major banners, and structural borders.',
    role_ar: 'اللون الأساسي للعناوين الرئيسية، وترويسات الصفحات، والبانرات الكبرى، والهياكل الرسمية.',
    sample_classes: 'bg-[#0A2540] text-white',
    border_class: 'border-[#0A2540]'
  },
  {
    name_en: 'Turquoise / Teal',
    name_ar: 'الأزرق الفيروزي',
    hex: '#0891B2',
    role_en: 'Educational element accents, vocabulary card backgrounds, icons, and practice dividers.',
    role_ar: 'العناصر التعليمية، وبطاقات المفردات، والأيقونات النشطة، وفواصل الأنشطة والتمارين.',
    sample_classes: 'bg-[#0891B2] text-white',
    border_class: 'border-[#0891B2]'
  },
  {
    name_en: 'Golden Amber Yellow',
    name_ar: 'الأصفر الذهبي',
    hex: '#D97706',
    role_en: 'Highlighting key information, grammar formula cards, badges, and learning goals.',
    role_ar: 'إبراز القواعد والمعلومات الجوهرية، وبطاقات أهداف التعلم، ومربعات التنبيهات الذكية.',
    sample_classes: 'bg-[#D97706] text-white',
    border_class: 'border-[#D97706]'
  },
  {
    name_en: 'Ice Blue / Cyan Tint',
    name_ar: 'درجات الأزرق الفاتح',
    hex: '#E0F2FE',
    role_en: 'Subtle section containers, dialogue bubble backgrounds, and exercise surfaces.',
    role_ar: 'خلفيات الحاويات والبطاقات التعليمية، وفقاعات الحوار، وأسطح كتابة التمارين المريحة للعين.',
    sample_classes: 'bg-[#E0F2FE] text-[#0A2540]',
    border_class: 'border-[#BAE6FD]'
  },
  {
    name_en: 'Pure White & Off-White',
    name_ar: 'الأبيض النقي والخلفيات المضيئة',
    hex: '#FFFFFF',
    role_en: 'High contrast text readability, printing clarity, and generous balanced negative space.',
    role_ar: 'وضوح القراءة، وسلامة الطباعة المدرسية، والمساحات البيضاء المدروسة لمنع الازدحام.',
    sample_classes: 'bg-white text-slate-900',
    border_class: 'border-slate-200'
  }
];

export const DESIGN_PRINCIPLES = [
  {
    title_ar: 'توزيع متوازن من أعلى الصفحة لأسفلها',
    title_en: 'Vertical Space Equilibrium',
    desc_ar: 'معالجة مشكلة النسخ القديمة التي كانت تتركز في أعلى الصفحة وتترك النصف السفلي فارغاً، من خلال تقسيم الدرس إلى 4 بطاقات تفاعلية متناسقة الارتفاع.',
    desc_en: 'Eliminates sparse bottom pages by distributing learning into 4 proportional cards: Vocab, Language Model, Guided Practice, and Communicative Output.',
    icon: 'LayoutGrid'
  },
  {
    title_ar: 'تأصيل البيئة التعليمية لمدرسة قفلة وشبوة',
    title_en: 'Contextual Local Cultural Grounding',
    desc_ar: 'الحوارات والأنشطة تجسد طلاب مدرسة قفلة (حسام وأيمن) وبيئة وادي هدى وحبان وعتق، مما يجعل الإنجليزية قريبة وملموسة للطلاب.',
    desc_en: 'Real dialogues featuring students at Qaflah School (Hussam & Ayman) in Shabwah Governorate, giving immediate communicative relevance.',
    icon: 'MapPin'
  },
  {
    title_ar: 'حوارات بصرية وفقاعات المتحدثين',
    title_en: 'Visual Dialogues & Character Bubbles',
    desc_ar: 'تصميم شخصيات كرتونية تعليمية وفقاعات كلام متباينة لتوضيح أدوار المتحدثين وإبراز العبارات المفتاحية بسهولة.',
    desc_en: 'Engaging speaker bubbles and character representations providing clear conversational turns and phrase highlights.',
    icon: 'MessageSquare'
  },
  {
    title_ar: 'تركيز القواعد والمخططات التوضيحية',
    title_en: 'Grammar Focus Visual Formulas',
    desc_ar: 'تحويل القواعد اللغوية إلى قوالب بصرية ومخططات مع أمثلة ملونة لتسهيل الفهم دون إغراق الطالب بنصوص نظرية طويلة.',
    desc_en: 'Structured grammar blocks displaying patterns, formulas, and contrastive examples in concise visual cards.',
    icon: 'Sparkles'
  },
  {
    title_ar: 'دليل المعلم ثنائي اللغة العملي',
    title_en: 'Actionable Bilingual Teacher Guide',
    desc_ar: 'تقسيم الحصة إلى روتين 30 دقيقة واضح: 5 دقائق مراجعة، 7 دقائق نمذجة، 8 دقائق تدريب، 6 دقائق تطبيق، 4 دقائق تقويم ختامي.',
    desc_en: 'Rapid-reference 30-minute pacing routine: Warm-up (5m), Modeling (7m), Guided Practice (8m), Pair Task (6m), Exit Check (4m).',
    icon: 'BookOpen'
  },
  {
    title_ar: 'جاهزية كاملة للطباعة بحجم A4 والتجليد',
    title_en: 'A4 Portrait Production Standards',
    desc_ar: 'هوامش احترافية 15 مم للتجليد، ألوان CMYK متناسقة، خطوط واضحة، وترويسة وتذييل تتضمن اسم المدرسة والصف والعام الأكاديمي 2027–2028.',
    desc_en: 'Standard 15mm binding margins, CMYK-safe color hierarchy, legible typography, school header, and academic year footer.',
    icon: 'Printer'
  }
];

export const SCHOOL_IDENTITY = {
  name_ar: 'مدرسة قفلة الأساسية',
  name_en: 'Qaflah Basic Education School',
  region_ar: 'منطقة وادي هدى – مديرية حبان – محافظة شبوة – الجمهورية اليمنية',
  region_en: 'Hada Region, Habban, Shabwah, Yemen',
  academic_year: '2027–2028',
  curriculum_framework: 'Modern International Educational Textbook Design (A1+ → A2 Bridge)',
  target_grades: 'الصف السابع والصف الثامن (Grade 7 & Grade 8)',
  publishing_house: 'دار النشر التربوي الدولي لمدرسة قفلة (Qaflah Educational Publishing)'
};
