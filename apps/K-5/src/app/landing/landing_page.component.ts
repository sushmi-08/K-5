import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { CoursesComponent } from '../courses/courses.component';
import { chapterSelector } from '../store/selectors/chapter.selector';
import { authActions } from '../store/actions/login.action';
import { userSelector } from '../store/selectors/login.selector';
import { lessonActions } from '../store/actions/lesson.action';


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, CoursesComponent, RouterLink],
  templateUrl: './landing_page.component.html',
  styleUrl: './landing_page.component.css',
})
export class LandingPageComponent implements OnInit{
  userName!: any;
  points!: any;
  avatars!: any;
  isSidenavOpen = false;
  lastViewedChapter!: any;
  chapterId!: any;
  chapterList!: any;
  courseIdList!: any;
  courseId!: any;
  //userName$ = Observable<any>;

  constructor(private router:Router, private store: Store){
  }

  ngOnInit(): void {
    this.store.select(userSelector).subscribe((authState) => {
      // console.log(authState);
      this.userName = authState.user.name;
      this.points = authState.user.totalPoints;
      this.avatars = authState.user.avatar;
      // console.log(this.avatars);

        });
        //this.userName$ = this.userName;
  }



  openNav() {
    this.isSidenavOpen = true;
  }

  closeNav() {
    this.isSidenavOpen = false;
  }

  onClick() {
    this.store.select(userSelector).subscribe((authState) => {
      // console.log(authState);
      this.lastViewedChapter = authState.user.lastViewedChapterId;

  });
  this.store.select(chapterSelector).subscribe((chapterState)=> {
    // console.log(chapterState);
    this.chapterList = chapterState;
    // console.log(this.chapterList)
  });

  this.courseIdList = this.chapterList.filter((lists:any) => this.lastViewedChapter == lists.id)
  // console.log(this.courseIdList[0].id);
  this.courseId = this.courseIdList[0].id
  this.router.navigate([`/courses/:${this.courseId}/chapters`]);
  this.store.dispatch(lessonActions.fetchLessons({chapterId:+this.courseId }))

}
logOut() {
  console.log('hi')
  this.store.dispatch(authActions.logout());
  this.router.navigate(['/'])
}


}
