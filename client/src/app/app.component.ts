import { Component, OnInit, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { AccountService } from './_services/account.service';
import { HomeComponent } from "./home/home.component";
import { NgxSpinnerComponent } from 'ngx-spinner';
import { User } from './_models/user';


@Component({
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  providers: [],
  imports: [RouterOutlet, NavComponent, HomeComponent, NgxSpinnerComponent
  ]
})
export class AppComponent implements OnInit {
  private accountService = Inject(AccountService);
  users: any;

  ngOnInit(): void {
    this.setCurrentUser();
   }
  

    setCurrentUser() {
      const userString = localStorage.getItem('user');
      if(!userString) return;
      const user: User = JSON.parse(userString);
      this.accountService.setCurrentUser(user);
     }
  }
