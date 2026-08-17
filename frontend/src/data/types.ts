export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number; // index of the correct option
  explanation: string;
}

export interface Lesson {
  lessonId: string;
  title: string;
  time: string; // e.g. "5 min"
  content: string;
  code?: string; // optional Python code snippet
  keys: string[]; // key takeaways
  quiz: QuizQuestion[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string; // Ionicons name
  lessons: Lesson[];
}

export interface Course {
  title: string;
  description: string;
}

export interface CourseData {
  course: Course;
  modules: Module[];
}
