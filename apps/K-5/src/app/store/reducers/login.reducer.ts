import { createReducer, on } from '@ngrx/store';

import { User } from '../../models/models.component';
import {
	authActions,
	lastViewedChapterActions,
	lastViewedCourseActions,
} from '../actions/login.action';
import { lessonActions } from '../actions/lesson.action';

export interface AuthState {
  user: User | null;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(authActions.loginSuccess, (state, { user }) => ({ ...state, user, error: null })),
  on(authActions.loginFailure, (state, { error }) => ({ ...state, user: null, error })),
  on(authActions.logout, () => initialState),
  on(lastViewedChapterActions.updateLastViewedChapterSuccess, (state, { lastViewedChapterId }) => ({
    ...state,
    user: state.user
      ? { ...state.user, lastViewedChapterId }
      : null,
  })),
  on(lastViewedChapterActions.updateLastViewedChapterFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(lastViewedCourseActions.updateLastViewedCourseSuccess, (state, { lastViewedCourseId }) => ({
    ...state,
    user: state.user
      ? { ...state.user, lastViewedCourseId }
      : null,
  })),
  on(lastViewedCourseActions.updateLastViewedCourseFailure, (state, { error }) => ({
    ...state,
    error,
  })),
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
