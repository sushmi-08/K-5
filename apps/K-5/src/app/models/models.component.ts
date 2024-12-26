export interface Lesson {
  id: string;
  name: string;
  description: string;
  xpPoints: number;
  difficulty: "Easy" | "Medium" | "Hard";
  isCompleted: boolean;
}

export interface Chapter {
  id: string;
  name: string;
  description: string;
  isCompleted: boolean;
  progress: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  name: string;
  isCompleted: boolean;
  progress: number;
  chapters: Chapter[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  totalPoints: number;
  lastViewedCourseId: number;
  lastViewedChapterId: number;
  courses: Course[];
}

// export interface User {
//   id: number;
//   name: string;
//   email: string;
//   password: string;
//   avatar: string;
//   totalPoints: number;
//   completedLessons: number[];
//   lastViewedChapterId: number;
//   progress: Progress;
// }

// export interface Progress {
//   courseId: number;
//   percentage: number;
// }

// export interface Course {
//   id: number;
//   name: string;
//   description: string;
//   chapters: number[];
// }

// export interface Chapter {
//   id: number;
//   name: string;
//   description: string;
//   courseId: number;
//   lessons: number[];
// }

// export interface Lesson {
//   id: number;
//   name: string;
//   description: string;
//   xpPoints: number;
//   difficulty: string;
//   chapterId: number;
// }

// export interface AppState {
//   users: User[];
//   courses: Course[];
//   chapters: Chapter[];
//   lessons: Lesson[];
//   selectedCourseId: number | null;
//   selectedChapterId: number | null;
//   recentChapter: Chapter | null;
// }
