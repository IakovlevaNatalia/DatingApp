import { Component, Input, OnInit, Output, EventEmitter, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ToastrModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
   private accountService = inject (AccountService);
   private toastr = inject (ToastrService);
   cancelRegister = output<boolean>();
  model: any = {}

    register () {
    this.accountService.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      },
      error: error => this.toastr.error(error.error)
      })
  }

  cancel () {
    this.cancelRegister.emit(false);
  }
}
