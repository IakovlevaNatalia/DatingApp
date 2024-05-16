import { Component, OnInit, ɵprovideZonelessChangeDetection } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { User } from '../user';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  providers: [
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  model: any = {}
  loggedIn=false;
  currentUser$: Observable<User | null> = of(null);

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.currentUser$=this.accountService.currentUser$;
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response);
      },
      error: error=> console.log(error)
    })
  }

  logout () {
    this.accountService.logout();
  }

}
