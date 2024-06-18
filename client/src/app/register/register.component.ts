import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from '../home/home.component';
import { CommonModule } from '@angular/common';
import { AccountService } from '../_services/account.service';
import { response } from 'express';
import { error } from 'console';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    HomeComponent,
    CommonModule,
    ToastrModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
   @Output() cancelRegister = new EventEmitter(); 
  model: any = {}

  constructor (private accountService: AccountService, private toastr: ToastrService) {}

  ngOnInit(): void {

  }

  register () {
    this.accountService.register(this.model).subscribe({
      next: () => {
        this.cancel();
      },
      error: error => this.toastr.error(error.error)
    })
  }

  cancel () {
    this.cancelRegister.emit(false);
  }
}
