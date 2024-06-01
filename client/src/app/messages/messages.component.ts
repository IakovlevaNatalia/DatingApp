import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MemberListComponent } from '../members/member-list/member-list.component';
import { MemberDetailsComponent } from '../members/member-details/member-details.component';
import { ListsComponent } from '../lists/lists.component';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    RouterModule,
    MemberListComponent,
    MemberDetailsComponent,
    ListsComponent
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {

}
