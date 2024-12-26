import { createActionGroup, props } from '@ngrx/store';

import { User } from '../../models/models.component';

export const lessonActions = createActionGroup({
  source: 'Lesson API',
  events: {
    'Mark Lesson Completed': props<{
      userId: string;
      courseId: string;
      chapterId: string;
      lessonId: string;
      lessonXpPoints: number;
    }>(),
    'Mark Lesson Completed Success': props<{ updatedUser: User }>(),
    'Mark Lesson Completed Failure': props<{ error: string }>(),
  },
});

// LessonActions.markLessonCompleted({
//   userId: ,
//   courseId: ,
//   chapterId: ,
//   lessonId: ,
//   lessonXpPoints: ,
// });
