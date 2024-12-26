import { createFeatureSelector, createSelector } from '@ngrx/store';

import { LessonState } from '../reducers/lesson.reducer';

export const selectLessonState = createFeatureSelector<LessonState>('lesson');

export const selectUser = createSelector(
  selectLessonState,
  (state) => state.user
);

export const selectLessonError = createSelector(
  selectLessonState,
  (state) => state.error
);
