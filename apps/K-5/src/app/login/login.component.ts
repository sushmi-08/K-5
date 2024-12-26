import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

import { chapterAction } from '../store/actions/chapter.action';
import { courseAction } from '../store/actions/course.action';
import { authActions } from '../store/actions/login.action';
import { userSelector } from '../store/selectors/login.selector';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private store: Store, private router: Router) {}

  userCredentials: any = {
    email: '',
    password: ''
  }

  isFormValid(): boolean {
    return this.userCredentials.email.length > 3 && this.userCredentials.password.length > 3;
  }

  onSubmit() {
    const { email, password } = this.userCredentials;
    this.store.dispatch(authActions.login({ email, password }));
    this.router.navigate(['/landing']);
    // this.store.dispatch(courseAction.loadCourses())
    // this.store.dispatch(chapterAction.loadChapters())
  }

}
