import { createReducer, on } from '@ngrx/store';

import { Chapter } from '../../models/models.component';
import { chapterAction } from '../actions/chapter.action';

const initialState: Chapter[] = []

export const chapterReducer = createReducer(
  initialState,
  on(chapterAction.loadChaptersSuccess, (state, action) => {
    return action.payload
  }),
  on(chapterAction.loadChaptersFailure, (state, action) => {
    return []
  })
)
