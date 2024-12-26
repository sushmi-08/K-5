import { createReducer, on } from '@ngrx/store';

import { User } from '../../models/models.component';
import { lessonActions } from '../actions/lesson.action';

export interface LessonState {
  user: User | null;
  error: string | null;
}

export const initialState: LessonState = {
  user: null,
  error: null,
};

export const lessonReducer = createReducer(
  initialState,
  on(lessonActions.markLessonCompletedSuccess, (state, { updatedUser }) => ({
    ...state,
    user: updatedUser,
    error: null,
  })),
  on(lessonActions.markLessonCompletedFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
