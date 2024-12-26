import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { UserService } from '../../services/user.service';
import { lessonActions } from '../actions/lesson.action';

@Injectable()
export class LessonEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  markLessonCompleted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(lessonActions.markLessonCompleted),
      mergeMap(({ userId, courseId, chapterId, lessonId, lessonXpPoints }) =>
        this.userService
          .markLessonCompleted(userId, courseId, chapterId, lessonId, lessonXpPoints)
          .pipe(
            map((updatedUser) => {
              return lessonActions.markLessonCompletedSuccess({ updatedUser });
            }),
            catchError((err) =>
              of(lessonActions.markLessonCompletedFailure({ error: err.message }))
            )
          )
      )
    )
  );
}
