import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from '../home/home.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    HomeComponent,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  @Input() usersFromHomeComponent: any;
  @Output() cancelRegister = new EventEmitter(); 
  model: any = {}

  constructor () {}

  ngOnInit(): void {

  }

  register () {
    console.log(this.model);
  }

  cancel () {
    this.cancelRegister.emit(false);
    console.log("блять заебал этот ангулар сраный");
  }

}
