export interface Unit {
  unit_number: number;
  unit_label: string;
  lessons_range: string;
  topic: string;
}

export interface StudentBookLesson {
  learning_goal: string;
  vocabulary: string[];
  language_focus_title: string;
  language_focus_content: string[];
  practise_items: string[];
  use_english: string;
  self_check: string;
}

export interface TeacherGuideLesson {
  aim: string;
  materials: string;
  timing: string;
  procedure: string[];
  stages_table: string[][];
  quick_check: string;
  support_extension: string;
  notes: string;
  answers: string[];
}

export interface Lesson {
  lesson_number: number;
  unit_number: number;
  title: string;
  page: number;
  category: string;
  student_book: StudentBookLesson;
  teacher_guide: TeacherGuideLesson;
}

export interface CurriculumData {
  grade: number;
  title: string;
  academic_year: string;
  location: string;
  school_name: string;
  target_level: string;
  total_lessons: number;
  total_units: number;
  units: Unit[];
  lessons: Lesson[];
}

export interface DeliverableFile {
  id: string;
  title_en: string;
  title_ar: string;
  grade: 7 | 8;
  type: 'Student Book' | "Teacher's Guide" | 'Cover Artwork' | 'Report' | 'Package ZIP';
  format: 'PDF' | 'DOCX' | 'PNG' | 'ZIP' | 'TXT';
  size_kb: number;
  size_formatted: string;
  pages?: number;
  download_url: string;
  description_ar: string;
  description_en: string;
  cover_preview?: string;
}

export interface QACheckItem {
  id: string;
  criterion_ar: string;
  criterion_en: string;
  requirement: string;
  status: 'passed' | 'verified';
  evidence_ar: string;
  evidence_en: string;
}
