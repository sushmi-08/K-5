import { Observable } from 'rxjs';

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

import { Chapter, Course, User } from '../models/models.component';
import { lessonActions } from '../store/actions/lesson.action';
import { lastViewedChapterActions } from '../store/actions/login.action';
import { chapterSelector } from '../store/selectors/chapter.selector';
import { courseSelector } from '../store/selectors/course.selector';
import { selectUser } from '../store/selectors/login.selector';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent implements OnInit {
  selectedCourseId: number | null = null;

courses?:Course[]=[]
chapters?:any=[]
// user:User ={
//   id: 0,
//   name: '',
//   email: '',
//   password: '',
//   avatar: '',
//   totalPoints: 0,
//   completedLessons: [],
//   lastViewedChapterId: 0,
//   progress:{
//     courseId: 0,
//     percentage: 0
//   }
//}
  constructor(private router:Router,private store:Store) {

  }

  ngOnInit(): void {
    console.log(this.router.url)
    this.store.select(courseSelector).subscribe(data=>{
      this.courses=data
      console.log(this.courses,"courses")
    })
    this.store.select(chapterSelector).subscribe((data)=>{
      console.log(data)
      this.chapters=data
    })
    this.store.select(selectUser).subscribe(data=>{

      //this.user=data
    })



  }
  getChaptersForCourse(id: number) {
    return this.chapters.filter((chapter: { courseId: number; }) => chapter.courseId == id);
  }


  // getChapterName(chapterId: number) {

  //   this.store.select(selectChapterById(chapterId)).subscribe(chapter => {
  //     if (chapter) {
  //       return chapter.name;
  //     }
  //     return 'Chapter not found';
  //   });
  // }
  toggleCourse(courseId: number): void {
    if (this.selectedCourseId === courseId) {
      this.selectedCourseId = null;
    } else {
      this.selectedCourseId = courseId;
    }
  }
  navigateChapterpage(id:string){
    this.router.navigate([`courses/:${id}/chapters`])
    console.log(this.router.url)
    //this.store.dispatch(lessonActions.fetchLessons({chapterId:+id }))
    //this.store.dispatch(lastViewedChapterActions.updateLastViewedChapter({userId:this.user.id , lastViewedChapterId:+id }))
  }

}
