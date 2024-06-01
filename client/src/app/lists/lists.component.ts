import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MemberListComponent } from '../members/member-list/member-list.component';
import { MemberDetailsComponent } from '../members/member-details/member-details.component';
import { MessagesComponent } from '../messages/messages.component';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [
    RouterModule,
    MemberListComponent,
    MemberDetailsComponent,
    MessagesComponent
  ],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent {

}
