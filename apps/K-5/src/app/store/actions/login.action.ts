import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { User } from '../../models/models.component';

export const authActions = createActionGroup({
  source: 'Auth API',
  events: {
    'Login': props<{ email: string; password: string }>(),
    'Login Success': props<{ user: User }>(),
    'Login Failure': props<{ error: string }>(),
    'Logout': emptyProps()
  },
});

export const lastViewedChapterActions = createActionGroup({
  source: 'Last Chapter Viewed API',
  events: {
    'Update Last Viewed Chapter': props<{ userId: number; lastViewedChapterId: number }>(),
    'Update Last Viewed Chapter Success': props<{ lastViewedChapterId: number }>(),
    'Update Last Viewed Chapter Failure': props<{ error: string }>(),
  },
});

export const lastViewedCourseActions = createActionGroup({
  source: 'Last Course Viewed API',
  events: {
    'Update Last Viewed Course': props<{ userId: number; lastViewedCourseId: number }>(),
    'Update Last Viewed Course Success': props<{ lastViewedCourseId: number }>(),
    'Update Last Viewed Course Failure': props<{ error: string }>(),
  },
});

// this.store.dispatch(lastViewedChapterActions.updateLastViewedChapter({userId: , lastViewedChapterId: }))
// this.store.dispatch(lastViewedCourseActions.updateLastViewedCourse({userId: , lastViewedCourseId: }))
