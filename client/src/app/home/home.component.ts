import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [
        CommonModule,
        RegisterComponent
    ]
})
export class HomeComponent implements OnInit{
  http = inject(HttpClient);
  registerMode=false;
  users: any;

  ngOnInit(): void {
    this.getUsers();
  }

  registerToggle() {
    this.registerMode=!this.registerMode;
  }
  
  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: (response: any) => this.users = response,
      error: (error: any) => console.log(error),
      complete: () => console.log('Request has completed')
      })
    }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

}
