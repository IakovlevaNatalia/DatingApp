/** тут ошибка Local storageimport { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { AccountService } from './_services/account.service';
import { User } from './user';
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    providers: [],
    imports: [
        CommonModule,
        NavComponent,
        HomeComponent,
        RegisterComponent,
        RouterModule,
        MemberListComponent,
        MemberDetailsComponent,
        ListsComponent,
        MessagesComponent
    ]
})

export class AppComponent implements OnInit {
  title = 'Dating app';

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
}*/

import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { AccountService } from './_services/account.service';
import { User } from './user';
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  providers: [],
  imports: [
    CommonModule,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    RouterModule,
    MemberListComponent,
    MemberDetailsComponent,
    ListsComponent,
    MessagesComponent
  ]
})
export class AppComponent implements OnInit {
  title = 'Dating app';

  constructor(private accountService: AccountService, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    if (isPlatformBrowser(this.platformId)) {
      const userString = localStorage.getItem('user');
      if(!userString) return;
      const user: User = JSON.parse(userString);
      this.accountService.setCurrentUser(user);
    }
  }
}