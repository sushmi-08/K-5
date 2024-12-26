import { provideHttpClient } from '@angular/common/http';
import {
	ApplicationConfig,
	isDevMode,
	provideZoneChangeDetection,
} from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { MetaReducer, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { appRoutes } from './app.routes';
import { ChapterEffects } from './store/effects/chapter.effect';
import { CourseEffects } from './store/effects/course.effect';
import { LessonEffects } from './store/effects/lesson.effect';
import { AuthEffects } from './store/effects/login.effect';
import { chapterReducer } from './store/reducers/chapter.reducer';
import { courseReducer } from './store/reducers/course.reducer';
import { lessonReducer } from './store/reducers/lesson.reducer';
import { authReducer } from './store/reducers/login.reducer';
import { clearState } from './store/reducers/logout.reducer';

const metaReducers: MetaReducer<any>[] = [clearState];
export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideStore({auth: authReducer, lesson: lessonReducer }, {metaReducers}),
    provideEffects([AuthEffects, LessonEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
],
};
