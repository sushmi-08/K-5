import { catchError, map, of, switchMap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { User } from '../../models/models.component';
import {
	authActions,
	lastViewedChapterActions,
	lastViewedCourseActions,
} from '../actions/login.action';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      switchMap(({ email, password }) =>
        this.http
          .get<User[]>(`http://localhost:5000/users?email=${email}&password=${password}`)
          .pipe(
            map((users) => {
              if (users.length > 0) {
                return authActions.loginSuccess({ user: users[0] });
              } else {
                return authActions.loginFailure({ error: 'Invalid credentials' });
              }
            }),
            catchError(() => of(authActions.loginFailure({ error: 'Server error' })))
          )
      )
    )
  );

  updateLastViewedChapter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(lastViewedChapterActions.updateLastViewedChapter),
      switchMap(({ userId, lastViewedChapterId }) =>
        this.http
          .patch(`http://localhost:5000/users/${userId}`, { lastViewedChapterId })
          .pipe(
            map(() =>
              lastViewedChapterActions.updateLastViewedChapterSuccess({ lastViewedChapterId })
            ),
            catchError(() =>
              of(
                lastViewedChapterActions.updateLastViewedChapterFailure({
                  error: 'Failed to update last viewed chapter',
                })
              )
            )
          )
      )
    )
  );

  updateLastViewedCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(lastViewedCourseActions.updateLastViewedCourse),
      switchMap(({ userId, lastViewedCourseId }) =>
        this.http
          .patch(`http://localhost:5000/users/${userId}`, { lastViewedCourseId })
          .pipe(
            map(() =>
              lastViewedCourseActions.updateLastViewedCourseSuccess({ lastViewedCourseId })
            ),
            catchError(() =>
              of(
                lastViewedCourseActions.updateLastViewedCourseFailure({
                  error: 'Failed to update last viewed course',
                })
              )
            )
          )
      )
    )
  );
}
