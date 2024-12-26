import { Observable, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../models/models.component';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'http://localhost:5000/users';

  constructor(private http: HttpClient) {}

  // Fetch a user by ID
  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  // Update the user object in the backend
  updateUser(userId: string, updatedUser: User): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${userId}`, updatedUser);
  }

  // Mark a lesson as completed
  markLessonCompleted(
    userId: string,
    courseId: string,
    chapterId: string,
    lessonId: string,
    lessonXpPoints: number
  ): Observable<User> {
    return this.getUserById(userId).pipe(
      map((user) => {
        if (!user) throw new Error('User not found');

        // 1) Find the course
        const course = user.courses.find((c) => c.id === courseId);
        if (!course) throw new Error('Course not found');

        // 2) Find the chapter
        const chapter = course.chapters.find((ch) => ch.id === chapterId);
        if (!chapter) throw new Error('Chapter not found');

        // 3) Find the lesson
        const lesson = chapter.lessons.find((l) => l.id === lessonId);
        if (!lesson) throw new Error('Lesson not found');

        // 4) Mark the lesson as completed
        lesson.isCompleted = true;

        // 5) Update the user's total points
        user.totalPoints += lessonXpPoints;

        // 6) Recalculate chapter progress
        const totalLessons = chapter.lessons.length;
        const completedLessons = chapter.lessons.filter((l) => l.isCompleted).length;
        chapter.progress = Math.round((completedLessons / totalLessons) * 100);
        chapter.isCompleted = chapter.progress === 100;

        // 7) Recalculate course progress
        const totalChapters = course.chapters.length;
        const completedChapters = course.chapters.filter((ch) => ch.isCompleted).length;
        course.progress = Math.round((completedChapters / totalChapters) * 100);
        course.isCompleted = course.progress === 100;

        // Return the mutated user for updating in backend
        return user;
      }),
      switchMap((updatedUser) => this.updateUser(userId, updatedUser))
    );
  }
}
