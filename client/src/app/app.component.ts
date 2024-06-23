import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { AccountService } from './_services/account.service';
import { HomeComponent } from "./home/home.component";
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { User } from './user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  providers: [],
  imports: [
    NavComponent,
    HomeComponent,
    RouterModule,
    ToastrModule,
    RouterOutlet
  ]
})
export class AppComponent implements OnInit {
  http = inject (HttpClient);
  private accountService = inject(AccountService);
  title = 'Dating app';
  users: any;

  ngOnInit(): void {
    this.getUsers();
    this.setCurrentUser();
  }

  setCurrentUser() {
      const userString = localStorage.getItem('user');
      if(!userString) return;
      const user: User = JSON.parse(userString);
      this.accountService.setCurrentUser(user);
    
  }

  getUsers () {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: response => this.users =response,
      error: error => console.log(error),
      complete: () => console.log('Request has completed')
    })
  }
}