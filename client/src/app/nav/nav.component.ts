import { Component, OnInit, ɵprovideZonelessChangeDetection } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { CommonModule } from '@angular/common';

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

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
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
