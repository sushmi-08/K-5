import { Observable } from 'rxjs';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { Chapter, Course, Lesson, User } from '../models/models.component';
import { chapterSelector } from '../store/selectors/chapter.selector';
import { lessonActions } from '../store/actions/lesson.action';
//import { selectLessons } from '../store/selectors/lesson.selector';
import { selectUser } from '../store/selectors/login.selector';

// import { completeLesson, selectCourse } from '../store/actions';
// import {
// 	selectSelectedChapter,
// 	selectSelectedCourse,
// } from '../store/selectors';

@Component({
  selector: 'app-chapters',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './chapters.component.html',
  styleUrl: './chapters.component.css',
})
export class ChaptersComponent implements OnInit{
lessons:Lesson[]=[]
selectedLessonId = 0
selectedChapterId=0
// user:User={
//    id: 0,
//    name: '',
//    email: '',
//    password: '',
//    avatar: '',
//    totalPoints: 0,
//    completedLessons: [],
//    lastViewedChapterId: 0,
//    progress: {
//      courseId: 0,
//      percentage: 0
//    }
//  }

  constructor(private store: Store, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.selectedChapterId = +params.get('courseId')!; 
     
    });
    this.store.select(selectUser).subscribe(data=>{
     
      //this.user=data
    })
    console.log("chapters")
    // this.store.select(selectLessons).subscribe(data=>{
     
    //   this.lessons=data
    // })
    

  }
  toggleCompletion(lessonId: number): void {
    // const lesson = this.lessons.find((lesson) => lesson.id === lessonId);
    // console.log(lesson)
    // if (lesson) {
    //   this.store.dispatch(lessonActions.completeLesson({ userId:this.user.id , lessonId:lessonId , points:lesson.xpPoints }))
    // }
    // this.user.completedLessons.push(lessonId)
   
  }

  // onCompleteLesson(userId: number, lessonId: number) {
  //   this.store.dispatch(completeLesson({ userId, lessonId }));
  // }


  selectLesson(lessonId: number): void {
    this.selectedLessonId = lessonId;
  }



  // getSelectedLesson(){
  //   return this.lessons.find(lesson => lesson.id === this.selectedLessonId);
  // }


}
