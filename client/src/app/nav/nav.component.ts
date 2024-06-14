import { Component, OnInit, ɵprovideZonelessChangeDetection } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    RouterOutlet
  ],
  providers: [
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  model: any = {}
  loggedIn=false;

  constructor(public accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: _ => this.router.navigateByUrl('/members'),
      error: error=> console.log(error)
    })
  }

  logout () {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
